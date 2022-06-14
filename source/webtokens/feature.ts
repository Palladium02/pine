import {HttpUnauthorized} from '../application';
import {Context} from '../context';
import {verify} from './verify';

const webtoken = (secret: string) => {
  return (context: Context) => {
    const token = context.request.header('bearer-token');
    if (!token) throw new HttpUnauthorized('Unauthorized.');
    if (verify({token, secret}) instanceof Error) {
      throw new HttpUnauthorized('Unauthorized.');
    }
  };
};

export {webtoken};
