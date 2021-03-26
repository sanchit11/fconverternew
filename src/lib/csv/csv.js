// -------------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License (MIT). See LICENSE in the repo root for license information.
// -------------------------------------------------------------------------------------------------

let parseString = require('xml2js').parseString;
let dataHandler = require('../dataHandler/dataHandler');

module.exports = class csv extends dataHandler {
    constructor() {
        super("csv");
    }

    parseSrcData(data) {
        return new Promise((fulfill, reject) => {
            parseString(data, { trim: true, explicitCharkey :true, mergeAttrs: true, explicitArray:false }, function (err, result) {
                if (err) {
                    reject(err);
                }
                console.log('csv');
                result._originalData=data;
                fulfill(result);
            });
        });
    }

    preProcessTemplate(templateStr) {
        return super.preProcessTemplate(templateStr);
    }

    postProcessResult(inResult) {
        return super.postProcessResult(inResult);
    }

    getConversionResultMetadata(context) {
        return super.getConversionResultMetadata(context);
    }
};
