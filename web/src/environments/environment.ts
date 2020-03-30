
export const environment = {
    production: false,

    gateway: {
        api: 'https://localhost:7000/api',
    },

    // AUTH0
    auth0: {
        domain: 'murpheux.auth0.com',
        clientId: 'EKaZmjHFRlGyTS1Fgoxg98KplWV913aK',
        callbackURL: 'https://localhost:9000'
    },

    version: '0.0.1',

    map: {
        api_key: '' // process.env.GOOGLE_API_KEY
    }
};
