import {userInfo} from 'os';
import {Colors} from '../utils/colors';
import {date} from '../utils/date';

/**
 * Class representing a logger.
 */
class LoggerWriter {
  /**
   * Method that logs a info message
   * @param {String} message
   */
  public info(message: string) {
    console.log(
        `${Colors.blue('Info')} [${date()}]] (${process.pid} on ${userInfo().username}): ${message}`,
    );
  }
}

const Logger = new LoggerWriter();
export {
  Logger,
};
