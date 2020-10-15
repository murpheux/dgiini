export const environment = {
    production: false,

    // AUTH0
    auth0: {
        domain: 'murpheux.auth0.com',
        clientId: 'CMVPqSIb_wIkCr6gfdCk2q9JPDJh41CW',
        callbackURL: 'https://sdpro.dynu.com:8443',
    },

    googleApi: {
        API_KEY: 'AIzaSyB4rkOg7uSupskMTi-2kiteuvn2KaBswZU'
    },

    provider: {
        ip: 'http://api.ipify.org/?format=json',
        proxy: 'https://cors-anywhere.herokuapp.com',
    },

    stripe: {
        Publishable_key: 'pk_test_51HRj2GEoqCmvHb0cQ99bpnIBGAS5jsbM1pakIjItoVtrgkIghwkGEmmEt7Yh14YRvHc9LE3LPePNobbQ28DneqiE008QNBThEh',
        Secret_key: 'sk_test_51HRj2GEoqCmvHb0c5e8Tgg7CRGDpgULvw2O02tajBt83jLhJTPSOVx6J3EXEUiqHurBFCOgAGj0Rm35LHqF315Ky00gBxqVcf1'
    },

    countries: [
        { name: 'Canada', code: 'ca' },
        { name: 'United States', code: 'us' },
    ],
};
