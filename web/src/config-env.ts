import { writeFile } from 'fs';
import config from 'dotenv/config';

const environment = process.env.ENVIRONMENT;
let apiURL;

if (environment === 'production') {
    apiURL = process.env.PROD_TASK_BASE_URL;
} else if (environment === 'test') {
    apiURL = process.env.TEST_TASK_BASE_URL;
}

const targetPath = `./src/environments/environment.demo.ts`;
const envConfigFile = `
export const environment = {
    production: true,
    apiUrl: '${apiURL}'
};`;

writeFile(targetPath, envConfigFile, (err) => {
    if (err) { console.log(err); }
});
