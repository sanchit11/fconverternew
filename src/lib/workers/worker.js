// -------------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License (MIT). See LICENSE in the repo root for license information.
// -------------------------------------------------------------------------------------------------


var path = require('path');
var fs = require('fs');
var Promise = require('promise');
var compileCache = require('memory-cache');
var constants = require('../constants/constants');
var errorCodes = require('../error/error').errorCodes;
var errorMessage = require('../error/error').errorMessage;
var HandlebarsConverter = require('../handlebars-converter/handlebars-converter');
var WorkerUtils = require('./workerUtils');
var dataHandlerFactory = require('../dataHandler/dataHandlerFactory');
const { createNamespace } = require("cls-hooked");
//var xmlParser = require('xml2json');
var session = createNamespace(constants.CLS_NAMESPACE);

var rebuildCache = true;

function GetHandlebarsInstance(dataTypeHandler, templatesMap) {
    // New instance should be created when using templatesMap
    let needToUseMap = templatesMap && Object.entries(templatesMap).length > 0 && templatesMap.constructor === Object;
    var instance = HandlebarsConverter.instance(needToUseMap ? true : rebuildCache,
        dataTypeHandler,
        path.join(constants.TEMPLATE_FILES_LOCATION, dataTypeHandler.dataType),
        templatesMap);
    rebuildCache = needToUseMap ? true : false; // New instance should be created also after templatesMap usage

    return instance;
}

function expireCache() {
    rebuildCache = true;
    compileCache.clear();
}

function generateResult(dataTypeHandler, dataContext, template) {
    var result = dataTypeHandler.postProcessResult(template(dataContext));
    return Object.assign(dataTypeHandler.getConversionResultMetadata(dataContext.msg), { 'fhirResource': result });
}

WorkerUtils.workerTaskProcessor((msg) => {
    //console.log('msg ===== ', msg); 
    return new Promise((fulfill, reject) => {
        session.run(() => {
            switch (msg.type) {
                case '/api/convert/:srcDataType':
                    {
                        try {
                            const base64RegEx = /^[a-zA-Z0-9/\r\n+]*={0,2}$/;

                            if (!base64RegEx.test(msg.srcDataBase64)) {
                                reject({ 'status': 400, 'resultMsg': errorMessage(errorCodes.BadRequest, "srcData is not a base 64 encoded string.") });
                            }

                            if (!base64RegEx.test(msg.templateBase64)) {
                                reject({ 'status': 400, 'resultMsg': errorMessage(errorCodes.BadRequest, "Template is not a base 64 encoded string.") });
                            }

                            var templatesMap = undefined;
                            if (msg.templatesOverrideBase64) {
                                if (!base64RegEx.test(msg.templatesOverrideBase64)) {
                                    reject({ 'status': 400, 'resultMsg': errorMessage(errorCodes.BadRequest, "templatesOverride is not a base 64 encoded string.") });
                                }
                                templatesMap = JSON.parse(Buffer.from(msg.templatesOverrideBase64, 'base64').toString());
                            }


                            var templateString = "";
                            if (msg.templateBase64) {
                                templateString = Buffer.from(msg.templateBase64, 'base64').toString();
                            }

                            try {
                                var b = Buffer.from(msg.srcDataBase64, 'base64');
                                var s = b.toString();
                            }
                            catch (err) {
                                reject({ 'status': 400, 'resultMsg': errorMessage(errorCodes.BadRequest, `Unable to parse input data. ${err.message}`) });
                            }
                            var dataTypeHandler = dataHandlerFactory.createDataHandler(msg.srcDataType);
                            let handlebarInstance = GetHandlebarsInstance(dataTypeHandler, templatesMap);
                            session.set(constants.CLS_KEY_HANDLEBAR_INSTANCE, handlebarInstance);
                            session.set(constants.CLS_KEY_TEMPLATE_LOCATION, path.join(constants.TEMPLATE_FILES_LOCATION, dataTypeHandler.dataType));
                            
                            dataTypeHandler.parseSrcData(s)
                                .then((parsedData) => {
                                    var dataContext = { msg: parsedData };
                                    //console.log('dataContext= ', parsedData);
                                    if (templateString == null || templateString.length == 0) {
                                        console.log('aaaaa');
                                        var result = Object.assign(dataTypeHandler.getConversionResultMetadata(dataContext.msg),
                                            JSON.parse(JSON.stringify(dataContext.msg)));

                                        fulfill({ 'status': 200, 'resultMsg': result });
                                    }
                                    else {
                                        console.log('bbbbb');
                                        var template = handlebarInstance.compile(dataTypeHandler.preProcessTemplate(templateString));
                                        console.log('msgtest == ', generateResult(dataTypeHandler, dataContext, template));
                                        if(msg.srcDataType == 'csv') {
                                                //console.log('gggg');
                                            //const xmlToJson = require('xml-to-json-stream');
                                            //const parserxml = xmlToJson();

                                            //const parser22 = xmlToJson({attributeMode:false});
                                            var parser = require('fast-xml-parser');
                                            var he = require('he');


                                            var options = {
                                                attributeNamePrefix : "@_",
                                                attrNodeName: "attr", //default is 'false'
                                                textNodeName : "#text",
                                                ignoreAttributes : false,
                                                ignoreNameSpace : false,
                                                allowBooleanAttributes : false,
                                                parseNodeValue : false,
                                                parseAttributeValue : false,
                                                trimValues: true,
                                                cdataTagName: "__cdata", //default is 'false'
                                                cdataPositionChar: "\\c",
                                                parseTrueNumberOnly: false,
                                                arrayMode: false, //"strict"
                                                attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
                                                tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
                                                stopNodes: ["parse-me-as-string"]
                                            };


                                            var base64data = msg.srcDataBase64;
                                            var templateBase64 = msg.templateBase64;
                                            var templatesOverrideBase64 = msg.templatesOverrideBase64;

                                            
                                            let buff_base64data = new Buffer.from(base64data, 'base64');
                                            var text_base64data = buff_base64data.toString('ascii');

                                            //var str = '<root><foobar id="blah"></foobar></root>'
                                            //var doc = parseXML(str);

                                            text_base64data = text_base64data.replace("\n","");
                                            text_base64data = text_base64data.replace("\t","");
                                            text_base64data = text_base64data.replace("\/","");
                                            //var output_base64data = parser.xmlToJson(text_base64data);  
               
                                           /* if( parser.validate(text_base64data) === true) { //optional (it'll return an object in case it's not valid)
                                                console.log('success parsing');
                                                var jsonObj = parser.parse(text_base64data,options);
                                            }*/

                                            // Intermediate obj
                                            var tObj = parser.getTraversalObj(text_base64data,options);
                                            var jsonObj = parser.convertToJson(tObj,options);

                            
                                            let buff_templateBase64 = new Buffer.from(templateBase64, 'base64');
                                            let text_templateBase64 = buff_templateBase64.toString('ascii');
                                            //var output_templateBase64 = xmlParser.toJson(text_templateBase64);  


                                            let buff_templatesOverrideBase64 = new Buffer.from(templatesOverrideBase64, 'base64');
                                            let text_templatesOverrideBase64 = buff_templatesOverrideBase64.toString('ascii');
                                            //var output_templatesOverrideBase64 = xmlParser.toJson(text_templatesOverrideBase64);  
             
                                            
                                            try {
                                                var mydta = {'mymessage': jsonObj.ClinicalDocument.component.structuredBody.component[0].section.entry.substanceAdministration};
                                                var tt = { fhirResource:
                                                            { resourceType: 'Bundle',
                                                                type: 'batch',
                                                                entry: [ mydta ] } }
                                                fulfill({ 'status': 200, 'resultMsg': tt });
                                            }
                                            catch (err) {
                                                reject({ 'status': 400, 'resultMsg': errorMessage(errorCodes.BadRequest, "Unable to create result: " + err.toString()) });
                                            }
                                        } else {
                                            try {
                                                fulfill({ 'status': 200, 'resultMsg': generateResult(dataTypeHandler, dataContext, template) });
                                            }
                                            catch (err) {
                                                reject({ 'status': 400, 'resultMsg': errorMessage(errorCodes.BadRequest, "Unable to create result: " + err.toString()) });
                                            }
                                        }
                                    }

                                })
                                .catch(err => {
                                    reject({ 'status': 400, 'resultMsg': errorMessage(errorCodes.BadRequest, `Unable to parse input data. ${err.toString()}`) });
                                });
                        }
                        catch (err) {
                            reject({ 'status': 400, 'resultMsg': errorMessage(errorCodes.BadRequest, `${err.toString()}`) });
                        }
                    }
                    break;

                case '/api/convert/:srcDataType/:template':
                    {
                        let srcData = msg.srcData;
                        let templateName = msg.templateName;
                        let srcDataType = msg.srcDataType;
                        let dataTypeHandler = dataHandlerFactory.createDataHandler(srcDataType);
                        let handlebarInstance = GetHandlebarsInstance(dataTypeHandler);
                        session.set(constants.CLS_KEY_HANDLEBAR_INSTANCE, handlebarInstance);
                        session.set(constants.CLS_KEY_TEMPLATE_LOCATION, path.join(constants.TEMPLATE_FILES_LOCATION, dataTypeHandler.dataType));

                        if (!srcData || srcData.length == 0) {
                            reject({ 'status': 400, 'resultMsg': errorMessage(errorCodes.BadRequest, "No srcData provided.") });
                        }

                        const getTemplate = (templateName) => {
                            return new Promise((fulfill, reject) => {
                                var template = compileCache.get(templateName);
                                if (!template) {
                                    fs.readFile(path.join(constants.TEMPLATE_FILES_LOCATION, srcDataType, templateName), (err, templateContent) => {
                                        if (err) {
                                            reject({ 'status': 404, 'resultMsg': errorMessage(errorCodes.NotFound, "Template not found") });
                                        }
                                        else {
                                            try {
                                                template = handlebarInstance.compile(dataTypeHandler.preProcessTemplate(templateContent.toString()));
                                                compileCache.put(templateName, template);
                                                fulfill(template);
                                            }
                                            catch (convertErr) {
                                                reject({
                                                    'status': 400,
                                                    'resultMsg': errorMessage(errorCodes.BadRequest,
                                                        "Error during template compilation. " + convertErr.toString())
                                                });
                                            }
                                        }
                                    });
                                }
                                else {
                                    fulfill(template);
                                }
                            });
                        };

                        dataTypeHandler.parseSrcData(srcData)
                            .then((parsedData) => {
                                var dataContext = { msg: parsedData };
                                getTemplate(templateName)
                                    .then((compiledTemplate) => {
                                        try {
                                            fulfill({
                                                'status': 200, 'resultMsg': generateResult(dataTypeHandler, dataContext, compiledTemplate)
                                            });
                                        }
                                        catch (convertErr) {
                                            reject({
                                                'status': 400,
                                                'resultMsg': errorMessage(errorCodes.BadRequest,
                                                    "Error during template evaluation. " + convertErr.toString())
                                            });
                                        }
                                    }, (err) => {
                                        reject(err);
                                    });
                            })
                            .catch(err => {
                                reject({ 'status': 400, 'resultMsg': errorMessage(errorCodes.BadRequest, `Unable to parse input data. ${err.toString()}`) });
                            });
                    }
                    break;

                case 'templatesUpdated':
                    {
                        expireCache();
                        fulfill();
                    }
                    break;

                case 'constantsUpdated':
                    {
                        constants = JSON.parse(msg.data);
                        expireCache();
                        fulfill();
                    }
                    break;
            }
        });
    });
});
