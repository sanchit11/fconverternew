// Generated from C:\src2\conversion-pilot\src\lib\outputProcessor\json.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');



var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0002\u000e\u0082\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
    "\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t",
    "\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004",
    "\f\t\f\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010",
    "\t\u0010\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013",
    "\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0004\u0003\u0004",
    "\u0003\u0005\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007",
    "\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\t\u0003\t\u0003\t\u0003",
    "\t\u0003\t\u0003\t\u0003\n\u0003\n\u0003\n\u0003\n\u0003\n\u0003\u000b",
    "\u0003\u000b\u0003\u000b\u0007\u000bG\n\u000b\f\u000b\u000e\u000bJ\u000b",
    "\u000b\u0003\u000b\u0003\u000b\u0003\f\u0003\f\u0003\f\u0005\fQ\n\f",
    "\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\u000e\u0003\u000e",
    "\u0003\u000f\u0003\u000f\u0003\u0010\u0005\u0010^\n\u0010\u0003\u0010",
    "\u0003\u0010\u0003\u0010\u0006\u0010c\n\u0010\r\u0010\u000e\u0010d\u0005",
    "\u0010g\n\u0010\u0003\u0010\u0005\u0010j\n\u0010\u0003\u0011\u0003\u0011",
    "\u0003\u0011\u0007\u0011o\n\u0011\f\u0011\u000e\u0011r\u000b\u0011\u0005",
    "\u0011t\n\u0011\u0003\u0012\u0003\u0012\u0005\u0012x\n\u0012\u0003\u0012",
    "\u0003\u0012\u0003\u0013\u0006\u0013}\n\u0013\r\u0013\u000e\u0013~\u0003",
    "\u0013\u0003\u0013\u0002\u0002\u0014\u0003\u0003\u0005\u0004\u0007\u0005",
    "\t\u0006\u000b\u0007\r\b\u000f\t\u0011\n\u0013\u000b\u0015\f\u0017\u0002",
    "\u0019\u0002\u001b\u0002\u001d\u0002\u001f\r!\u0002#\u0002%\u000e\u0003",
    "\u0002\n\n\u0002$$11^^ddhhppttvv\u0005\u00022;CHch\u0005\u0002\u0002",
    "!$$^^\u0003\u00022;\u0003\u00023;\u0004\u0002GGgg\u0004\u0002--//\u0005",
    "\u0002\u000b\f\u000f\u000f\"\"\u0002\u0086\u0002\u0003\u0003\u0002\u0002",
    "\u0002\u0002\u0005\u0003\u0002\u0002\u0002\u0002\u0007\u0003\u0002\u0002",
    "\u0002\u0002\t\u0003\u0002\u0002\u0002\u0002\u000b\u0003\u0002\u0002",
    "\u0002\u0002\r\u0003\u0002\u0002\u0002\u0002\u000f\u0003\u0002\u0002",
    "\u0002\u0002\u0011\u0003\u0002\u0002\u0002\u0002\u0013\u0003\u0002\u0002",
    "\u0002\u0002\u0015\u0003\u0002\u0002\u0002\u0002\u001f\u0003\u0002\u0002",
    "\u0002\u0002%\u0003\u0002\u0002\u0002\u0003\'\u0003\u0002\u0002\u0002",
    "\u0005)\u0003\u0002\u0002\u0002\u0007+\u0003\u0002\u0002\u0002\t-\u0003",
    "\u0002\u0002\u0002\u000b/\u0003\u0002\u0002\u0002\r1\u0003\u0002\u0002",
    "\u0002\u000f3\u0003\u0002\u0002\u0002\u00118\u0003\u0002\u0002\u0002",
    "\u0013>\u0003\u0002\u0002\u0002\u0015C\u0003\u0002\u0002\u0002\u0017",
    "M\u0003\u0002\u0002\u0002\u0019R\u0003\u0002\u0002\u0002\u001bX\u0003",
    "\u0002\u0002\u0002\u001dZ\u0003\u0002\u0002\u0002\u001f]\u0003\u0002",
    "\u0002\u0002!s\u0003\u0002\u0002\u0002#u\u0003\u0002\u0002\u0002%|\u0003",
    "\u0002\u0002\u0002\'(\u0007}\u0002\u0002(\u0004\u0003\u0002\u0002\u0002",
    ")*\u0007.\u0002\u0002*\u0006\u0003\u0002\u0002\u0002+,\u0007\u007f\u0002",
    "\u0002,\b\u0003\u0002\u0002\u0002-.\u0007<\u0002\u0002.\n\u0003\u0002",
    "\u0002\u0002/0\u0007]\u0002\u00020\f\u0003\u0002\u0002\u000212\u0007",
    "_\u0002\u00022\u000e\u0003\u0002\u0002\u000234\u0007v\u0002\u000245",
    "\u0007t\u0002\u000256\u0007w\u0002\u000267\u0007g\u0002\u00027\u0010",
    "\u0003\u0002\u0002\u000289\u0007h\u0002\u00029:\u0007c\u0002\u0002:",
    ";\u0007n\u0002\u0002;<\u0007u\u0002\u0002<=\u0007g\u0002\u0002=\u0012",
    "\u0003\u0002\u0002\u0002>?\u0007p\u0002\u0002?@\u0007w\u0002\u0002@",
    "A\u0007n\u0002\u0002AB\u0007n\u0002\u0002B\u0014\u0003\u0002\u0002\u0002",
    "CH\u0007$\u0002\u0002DG\u0005\u0017\f\u0002EG\u0005\u001d\u000f\u0002",
    "FD\u0003\u0002\u0002\u0002FE\u0003\u0002\u0002\u0002GJ\u0003\u0002\u0002",
    "\u0002HF\u0003\u0002\u0002\u0002HI\u0003\u0002\u0002\u0002IK\u0003\u0002",
    "\u0002\u0002JH\u0003\u0002\u0002\u0002KL\u0007$\u0002\u0002L\u0016\u0003",
    "\u0002\u0002\u0002MP\u0007^\u0002\u0002NQ\t\u0002\u0002\u0002OQ\u0005",
    "\u0019\r\u0002PN\u0003\u0002\u0002\u0002PO\u0003\u0002\u0002\u0002Q",
    "\u0018\u0003\u0002\u0002\u0002RS\u0007w\u0002\u0002ST\u0005\u001b\u000e",
    "\u0002TU\u0005\u001b\u000e\u0002UV\u0005\u001b\u000e\u0002VW\u0005\u001b",
    "\u000e\u0002W\u001a\u0003\u0002\u0002\u0002XY\t\u0003\u0002\u0002Y\u001c",
    "\u0003\u0002\u0002\u0002Z[\n\u0004\u0002\u0002[\u001e\u0003\u0002\u0002",
    "\u0002\\^\u0007/\u0002\u0002]\\\u0003\u0002\u0002\u0002]^\u0003\u0002",
    "\u0002\u0002^_\u0003\u0002\u0002\u0002_f\u0005!\u0011\u0002`b\u0007",
    "0\u0002\u0002ac\t\u0005\u0002\u0002ba\u0003\u0002\u0002\u0002cd\u0003",
    "\u0002\u0002\u0002db\u0003\u0002\u0002\u0002de\u0003\u0002\u0002\u0002",
    "eg\u0003\u0002\u0002\u0002f`\u0003\u0002\u0002\u0002fg\u0003\u0002\u0002",
    "\u0002gi\u0003\u0002\u0002\u0002hj\u0005#\u0012\u0002ih\u0003\u0002",
    "\u0002\u0002ij\u0003\u0002\u0002\u0002j \u0003\u0002\u0002\u0002kt\u0007",
    "2\u0002\u0002lp\t\u0006\u0002\u0002mo\t\u0005\u0002\u0002nm\u0003\u0002",
    "\u0002\u0002or\u0003\u0002\u0002\u0002pn\u0003\u0002\u0002\u0002pq\u0003",
    "\u0002\u0002\u0002qt\u0003\u0002\u0002\u0002rp\u0003\u0002\u0002\u0002",
    "sk\u0003\u0002\u0002\u0002sl\u0003\u0002\u0002\u0002t\"\u0003\u0002",
    "\u0002\u0002uw\t\u0007\u0002\u0002vx\t\b\u0002\u0002wv\u0003\u0002\u0002",
    "\u0002wx\u0003\u0002\u0002\u0002xy\u0003\u0002\u0002\u0002yz\u0005!",
    "\u0011\u0002z$\u0003\u0002\u0002\u0002{}\t\t\u0002\u0002|{\u0003\u0002",
    "\u0002\u0002}~\u0003\u0002\u0002\u0002~|\u0003\u0002\u0002\u0002~\u007f",
    "\u0003\u0002\u0002\u0002\u007f\u0080\u0003\u0002\u0002\u0002\u0080\u0081",
    "\b\u0013\u0002\u0002\u0081&\u0003\u0002\u0002\u0002\u000e\u0002FHP]",
    "dfipsw~\u0003\b\u0002\u0002"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

function jsonLexer(input) {
	antlr4.Lexer.call(this, input);
    this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    return this;
}

jsonLexer.prototype = Object.create(antlr4.Lexer.prototype);
jsonLexer.prototype.constructor = jsonLexer;

Object.defineProperty(jsonLexer.prototype, "atn", {
        get : function() {
                return atn;
        }
});

jsonLexer.EOF = antlr4.Token.EOF;
jsonLexer.T__0 = 1;
jsonLexer.T__1 = 2;
jsonLexer.T__2 = 3;
jsonLexer.T__3 = 4;
jsonLexer.T__4 = 5;
jsonLexer.T__5 = 6;
jsonLexer.T__6 = 7;
jsonLexer.T__7 = 8;
jsonLexer.T__8 = 9;
jsonLexer.STRING = 10;
jsonLexer.NUMBER = 11;
jsonLexer.WS = 12;

jsonLexer.prototype.channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];

jsonLexer.prototype.modeNames = [ "DEFAULT_MODE" ];

jsonLexer.prototype.literalNames = [ null, "'{'", "','", "'}'", "':'", "'['", 
                                     "']'", "'true'", "'false'", "'null'" ];

jsonLexer.prototype.symbolicNames = [ null, null, null, null, null, null, 
                                      null, null, null, null, "STRING", 
                                      "NUMBER", "WS" ];

jsonLexer.prototype.ruleNames = [ "T__0", "T__1", "T__2", "T__3", "T__4", 
                                  "T__5", "T__6", "T__7", "T__8", "STRING", 
                                  "ESC", "UNICODE", "HEX", "SAFECODEPOINT", 
                                  "NUMBER", "INT", "EXP", "WS" ];

jsonLexer.prototype.grammarFileName = "json.g4";



exports.jsonLexer = jsonLexer;

