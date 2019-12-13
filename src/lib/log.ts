/**
 * 日志工具
 */
// tslint:disable-next-line:quotemark
import * as log4js from 'log4js';
const config = require("../../logconf.json");
const logger = log4js.getLogger();

log4js.configure(config);

// 支持日志类型  Todo 
const trace = logger.trace.bind(logger);
const debug = logger.debug.bind(logger);
const info = logger.info.bind(logger);
const warn = logger.warn.bind(logger);
const error = logger.error.bind(logger);
const fatal = logger.fatal.bind(logger);

export {trace, debug, info, warn, error, fatal};
