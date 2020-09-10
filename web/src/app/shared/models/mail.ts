
export interface IMail {
    from?: string;
    to: string;
    cc?: string;
    bcc?: string;
    subject: string;
    body: string;
}
