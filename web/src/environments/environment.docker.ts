const TASK_BASE_URL = 'http://70.77.10.241:8000';
const AUTH_BASE_URL = 'http://70.77.10.241:8008';
const MSG_BASE_URL = 'http://70.77.10.241:8004';
const IP_SERVICE = 'http://api.ipify.org';

export const environment = {
    production: false,
    TASK_API: `${TASK_BASE_URL}/api`,
    AUTH_API: `${AUTH_BASE_URL}/api`,
    MSG_API: `${MSG_BASE_URL}/api`,
    IP_SERVICE: `${IP_SERVICE}`
};
