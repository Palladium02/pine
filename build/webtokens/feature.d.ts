import { Context } from '../context';
declare const webtoken: (secret: string) => (context: Context) => void;
export { webtoken };
