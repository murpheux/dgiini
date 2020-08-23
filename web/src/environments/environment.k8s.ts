export const environment = {
    production: false,

    // AUTH0
    auth0: {
        domain: 'murpheux.auth0.com',
        clientId: 'CMVPqSIb_wIkCr6gfdCk2q9JPDJh41CW',
        callbackURL: 'https://dgiini-web-service',
    },

    provider: {
        ip: 'http://api.ipify.org/?format=json',
        proxy: 'https://cors-anywhere.herokuapp.com',
    },

    auth_ttl: 3600000, // 1hr

    countries: [
        { name: 'Canada', code: 'ca' },
        { name: 'United States', code: 'us' },
    ],
};
