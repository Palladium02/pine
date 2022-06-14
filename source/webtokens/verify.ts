import {decode} from './decode';
import {createSignature} from './sign';

interface Verify {
  token: string,
  secret: string
}

const isInPast = (exp: number) => {
  const now = new Date();
  return new Date(exp).setHours(0, 0, 0, 0) <= now.setHours( 0, 0, 0, 0);
};

const verify = ({token, secret}: Verify) => {
  const parts = token.split('.');

  if (parts.length !== 3) return new Error('Invalid token length');

  const [encodedHeader, encodedPayload, signature] = parts;

  const candidate = createSignature({encodedHeader, encodedPayload, secret});

  if (signature !== candidate) return new Error('Invalid token.');

  const decodedPayload = decode(token);
  if (isInPast(decodedPayload.exp)) {
    return new Error('Token has expired.');
  }

  return decodedPayload;
};

export {verify};

