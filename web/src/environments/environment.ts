
export const environment = {
    production: false,

    gateway: {
        api: 'https://localhost:7000/api',
    },

    // 3rd party services
    services: {
        ipify: 'http://api.ipify.org',
    },

    // AUTH0
    auth0: {
        domain: 'murpheux.auth0.com',
        clientId: 'EKaZmjHFRlGyTS1Fgoxg98KplWV913aK',
        callbackURL: 'http://localhost:9000'
    },

    version: '0.0.1'
};
