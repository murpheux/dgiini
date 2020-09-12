
export const environment = {
    production: false,

    // AUTH0
    auth0: {
        domain: 'murpheux.auth0.com',
        clientId: 'CMVPqSIb_wIkCr6gfdCk2q9JPDJh41CW',
        callbackURL: 'https://localhost:8443',
    },

    googleApi: {
        API_KEY: 'AIzaSyB4rkOg7uSupskMTi-2kiteuvn2KaBswZU'
    },

    provider: {
        ip: 'http://api.ipify.org/?format=json',
        proxy: 'https://cors-anywhere.herokuapp.com',
    },

    countries: [
        { name: 'Canada', code: 'ca' },
        { name: 'United States', code: 'us' },
    ],
};
