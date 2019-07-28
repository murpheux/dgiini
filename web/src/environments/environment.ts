const TASK_BASE_URL = 'http://localhost:8000';
const AUTH_BASE_URL = 'http://localhost:8008';
const MSG_BASE_URL = 'http://localhost:8004';
const IP_SERVICE = 'http://api.ipify.org';

export const environment = {
    production: false,
    TASK_API: `${TASK_BASE_URL}/api`,
    AUTH_API: `${AUTH_BASE_URL}/api`,
    MSG_API: `${MSG_BASE_URL}/api`,
    IP_SERVICE: `${IP_SERVICE}`
};
