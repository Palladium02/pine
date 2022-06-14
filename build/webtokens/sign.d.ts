interface Sign {
    payload: object;
    secret: string;
    options?: object;
}
interface Signature {
    encodedHeader: string;
    encodedPayload: string;
    secret: string;
}
declare const createSignature: ({ encodedHeader, encodedPayload, secret }: Signature) => string;
declare const sign: ({ payload, secret, options }: Sign) => string;
export { sign, createSignature };
