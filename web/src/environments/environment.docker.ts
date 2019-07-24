const TASK_BASE_URL = 'http://task_api';
const AUTH_BASE_URL = 'http://auth_api';
const MSG_BASE_URL = 'http://msg_api';

export const environment = {
    production: false,
    TASK_API: `${TASK_BASE_URL}/api`,
    AUTH_API: `${AUTH_BASE_URL}/api`,
    MSG_API: `${MSG_BASE_URL}/api`
};
