const APIGW_BASE_URL = 'https://sdpro.dynu.com:7000';
const IP_SERVICE = 'http://api.ipify.org';

export const environment = {
    production: false,

    APIGW_API: `${APIGW_BASE_URL}/api`,
    IP_SERVICE: `${IP_SERVICE}`,

    // AUTH0
    AUTH0_CLIENTID: 'EKaZmjHFRlGyTS1Fgoxg98KplWV913aK',
    AUTH0_DOMAIN: 'murpheux.auth0.com',
};
