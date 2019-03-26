export class Constants {
  public static readonly API_URL_DEVELOPMENT = 'http://localhost:5001/api';
  public static readonly API_URL_PRODUCTION = '...../api';
  public static readonly API_File = 'assets';
  public static readonly MODULE_API_MAP =  new Map<string, string>([
    ['Country', '/bpms-api-contactManagement/api/countries'],
    ['Region' , '/bpms-api-contactManagement/api/regions'],
    ['EntityType' , '/bpms-api-contactManagement/api/entityTypes'],
    ['IndustryType' , '/bpms-api-contactManagement/api/industryTypes'],
    ['EntityStakeholder' , '/bpms-api-contactManagement/api/entities'],
    ['Stakeholder' , '/bpms-api-contactManagement/api/stakeholders'],
    ['ProjectCode' , '/bpms-api-projectFormulation/api/projectCodes']
  ]);
}
