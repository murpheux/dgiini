
export const environment = {
    production: false,

    gateway: {
        api: 'https://www.dgiini.com/api',
    },

    // AUTH0
    auth0: {
        domain: 'murpheux.auth0.com',
        clientId: 'EKaZmjHFRlGyTS1Fgoxg98KplWV913aK',
        callbackURL: 'https://www.dgiini.com'
    },

    version: '0.0.1',
    auth_ttl: 3600000, // 1hr

    keys: {
        gmap: ''
    }
};
