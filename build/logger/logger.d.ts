/**
 * Class representing a logger.
 */
declare class LoggerWriter {
    /**
     * Method that logs a info message
     * @param {String} message
     */
    info(message: string): void;
}
declare const Logger: LoggerWriter;
export { Logger, };
