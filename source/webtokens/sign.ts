import crypto from 'crypto';

interface Sign {
  payload: object,
  secret: string,
  options?: object,
}

interface Signature {
  encodedHeader: string,
  encodedPayload: string,
  secret: string,
}

const DEFAULT_OPTIONS = {
  expiresIn: 8.64e7,
};

const createSignature = (
    {encodedHeader, encodedPayload, secret}: Signature,
) => {
  const signature = crypto.createHmac('SHA256', secret);
  return signature
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest('base64url');
};

const sign = ({payload, secret, options}: Sign) => {
  const mergedOptions = {...DEFAULT_OPTIONS, ...options};

  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };
  const encodedHeader = Buffer.from(
      JSON.stringify(header),
  ).toString('base64url');

  const now = Date.now();
  const expiresIn = now + mergedOptions.expiresIn;

  const encodedPayload = Buffer.from(
      JSON.stringify({
        ...payload,
        exp: expiresIn,
      }),
  ).toString('base64url');

  const signature = createSignature({encodedHeader, encodedPayload, secret});

  return [encodedHeader, encodedPayload, signature].join('.');
};

export {sign, createSignature};
