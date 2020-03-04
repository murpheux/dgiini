

export interface IResponse {
    code: number;
    description: string;
    payload: {
        count: number;
        data: any;
    };
}
