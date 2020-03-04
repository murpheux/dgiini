

export interface IResponse {
    code: number;
    description: string;
    payload: {
        count: number;
        // tslint:disable-next-line: no-any
        data: any;
    };
}
