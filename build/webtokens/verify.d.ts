interface Verify {
    token: string;
    secret: string;
}
declare const verify: ({ token, secret }: Verify) => any;
export { verify };
