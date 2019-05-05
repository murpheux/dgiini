import { UrlConfig } from './url-config';

export class PostmanConfig {
    public static readonly API_Prodoc_Budget_BASE = `${UrlConfig.POSTMAN_MOCK_API}/bpms-api-projectFormulation/api/budget`;
    public static readonly API_Prodoc_Context_BASE = `${UrlConfig.POSTMAN_MOCK_API}/bpms-api-projectFormulation/api/contexts`;
    public static readonly API_Prodoc_Resource_BASE = `${UrlConfig.POSTMAN_MOCK_API}/bpms-api-projectFormulation/api/resourceinfo`;
    public static readonly API_Stakeholder_BASE = `${UrlConfig.POSTMAN_MOCK_API}/bpms-api-projectFormulation/api/stakeholder`;
}
