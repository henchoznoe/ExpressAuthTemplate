"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.setupLogger = void 0;
const winston_1 = require("winston");
const morgan_1 = __importDefault(require("morgan"));
const setupLogger = (app) => {
    morgan_1.default.token('statusName', (_, res) => {
        return `${res.statusCode} - ${httpStatusDescriptions[res.statusCode] || 'Unknown Status'}`;
    });
    const customFormat = ':method -> :url [:statusName]';
    app.use((0, morgan_1.default)(customFormat, {
        stream: {
            write: (message) => {
                const statusCode = parseInt(message.split('[')[1].split(' - ')[0]);
                exports.logger[statusCode < 400 ? 'info' : 'error'](message.trim());
            }
        }
    }));
};
exports.setupLogger = setupLogger;
const { combine, timestamp, printf, colorize } = winston_1.format;
const customFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}] ${message}`;
});
exports.logger = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(timestamp({
        format: 'DD.MM.YYYY HH:mm:ss'
    }), colorize(), customFormat),
    transports: [new winston_1.transports.Console()]
});
const httpStatusDescriptions = {
    100: 'Continue',
    101: 'Switching Protocols',
    102: 'Processing',
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    203: 'Non-Authoritative Information',
    204: 'No Content',
    205: 'Reset Content',
    206: 'Partial Content',
    207: 'Multi-Status',
    208: 'Already Reported',
    226: 'IM Used',
    300: 'Multiple Choices',
    301: 'Moved Permanently',
    302: 'Found',
    303: 'See Other',
    304: 'Not Modified',
    305: 'Use Proxy',
    307: 'Temporary Redirect',
    308: 'Permanent Redirect',
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Payload Too Large',
    414: 'URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Range Not Satisfiable',
    417: 'Expectation Failed',
    418: "I'm a teapot",
    421: 'Misdirected Request',
    422: 'Unprocessable Entity',
    423: 'Locked',
    424: 'Failed Dependency',
    425: 'Too Early',
    426: 'Upgrade Required',
    428: 'Precondition Required',
    429: 'Too Many Requests',
    431: 'Request Header Fields Too Large',
    451: 'Unavailable For Legal Reasons',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported',
    506: 'Variant Also Negotiates',
    507: 'Insufficient Storage',
    508: 'Loop Detected',
    510: 'Not Extended',
    511: 'Network Authentication Required'
};
//# sourceMappingURL=logger.js.map