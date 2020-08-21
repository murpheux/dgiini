export interface IQueryBuilder {
    toQueryMap: () => Map<string, string>;
    toQueryString: () => string;
}
