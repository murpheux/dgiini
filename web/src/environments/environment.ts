const APIGW_BASE_URL = 'https://localhost:7000';
const IP_SERVICE = 'http://api.ipify.org';

export const environment = {
    production: false,
    APIGW_API: `${APIGW_BASE_URL}/api`,
    IP_SERVICE: `${IP_SERVICE}`
};
