"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const colors_1 = require("../utils/colors");
/**
 * Class representing a logger.
 */
class LoggerWriter {
    /**
     * Method that logs a info message
     * @param {String} message
     */
    info(message) {
        console.log(`[ ${colors_1.Colors.blue('info')} ] - ${message}`);
    }
}
const Logger = new LoggerWriter();
exports.Logger = Logger;
