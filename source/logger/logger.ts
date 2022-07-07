import {Colors} from '../utils/colors';

/**
 * Class representing a logger.
 */
class LoggerWriter {
  /**
   * Method that logs a info message
   * @param {String} message
   */
  public info(message: string) {
    console.log(`[ ${Colors.blue('info')} ] - ${message}`);
  }
}

const Logger = new LoggerWriter();
export {
  Logger,
};
