"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const os_1 = require("os");
const colors_1 = require("../utils/colors");
const date_1 = require("../utils/date");
/**
 * Class representing a logger.
 */
class LoggerWriter {
    /**
     * Method that logs a info message
     * @param {String} message
     */
    info(message) {
        console.log(`${colors_1.Colors.blue('Info')} [${(0, date_1.date)()}]] (${process.pid} on ${(0, os_1.userInfo)().username}): ${message}`);
    }
}
const Logger = new LoggerWriter();
exports.Logger = Logger;
