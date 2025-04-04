# dgiini / task.api

API for acting as a central authenticated data service for all EPIC front-ends

## Related projects


These projects comprise EAO EPIC:

* <https://github.com/bcgov/eagle-api>
* <https://github.com/bcgov/eagle-public>

## Pre-requisites

Run the following two scripts to create your environment

```bash
#!/bin/bash
yarn
```

## Database Setup

Database is mongodb. You can run a local instance of mongodb on local development 
machine or you can run the database in a docker container with the following command

```bash
#!/bin/bash

```

#### Generate data

Described in [generate README](generate.md)

#### Restoring from a live backup

Acquire a dump of the database from one of the live environments.

To make sure you don't have an existing old copy (careful, this is destructive):

```bash
#!/bin/bash
mongo
```

```mongo
use epic
db.dropDatabase()
```

##### Load database dump

1. Download and unzip archived dump file.
2. Restore the dump into your local mongo:

```bash
#!/bin/bash
mongorestore -d epic epic/
```


### Database Conversions

In the process of developing this application, we have database conversion scripts that must be run in order to update the db model so that the newest codebase can work properly.  There are currently two methods of doing the database conversion depending on how long-lived and memory intensive the conversion is.

### Method 1: db-migrate

### Method 2: node scripts named migration* in the root folder

### Method 1

See <https://www.npmjs.com/package/db-migrate> for documentation on running the db migrate command.  General use case for local development at the root folder:

```./node_modules/db-migrate/bin/db-migrate up```

For dev/test/prod environments, you will need to change the database.json file in the root folder accordingly and run with the --env param.  See <https://www.npmjs.com/package/db-migrate> for more information.

### Method 2

In the root folder, there are files named migrateDocuments*.js.  These are large, long-running, memory intensive scripts that operated on the vast majority of the EPIC documents.  As a result, db-migrate was slow and unreliable given the nature of the connection to our database.  As a result, these nodejs scripts operate using the mongodb driver in nodejs and can handle a more complicated, robust approach to doing the database conversion.  They can be run from your local machine as long as there is a ```oc port-forward``` tunnel from your machine to the openshift mongdb database.  Change the user/pass/port/host/authenticationDatabase params and the script will execute against the mongodb pod directly.

## Developing

See [Code Reuse Strategy](https://github.com/bcgov/eagle-dev-guides/dev_guides/code_reuse_strategy.md)

## Testing

An overview of the EPIC test stack can be found [here](https://github.com/bcgov/eagle-dev-guides/blob/master/dev_guides/testing_components.md).

This project is using [jest](http://jestjs.io/) as a testing framework. You can run tests with
`node_modules/.bin/jest`. Running with the `--watch` flag will re-run the tests every time a file is changed.

To run the tests in one file, simply pass the path of the file name e.g. `node_modules/.bin/jest ./api/test/yourtestfile.test.js --watch`. To run only one test in that file, chain the `.only` command e.g. `test.only("Search returns results", () => {})`.

The tests that are present are called in the deployment pipeline and will fail a build if they fail.  Better to run the above tests locally as part of your development cycle.

This project's test environment is inherited from the [ACRFD](https://github.com/bcgov/nrts-prc-api) test suite along with most of the project code itself.  When testing the API functionality, it is important to understand the mock router setup. When ACRFD was authored, it wasn't possible to get [swagger-tools](https://github.com/apigee-127/swagger-tools) router working in the test environment. As a result, all tests **_COMPLETELY bypass_ the real life swagger-tools router**. Instead, a middleware router called [supertest](https://github.com/visionmedia/supertest) is used to map routes to controller actions. In each controller test, you will need to add code like the following:

```javascript
const test_helper = require('./test_helper');
const app = test_helper.app;
const featureController = require('../controllers/feature.js');
const fieldNames = ['tags', 'properties', 'applicationID'];

app.get('/api/feature/:id', function(req, res) {
  let params = test_helper.buildParams({'featureId': req.params.id});
  let paramsWithFeatureId = test_helper.createPublicSwaggerParams(fieldNames, params);
  return featureController.protectedGet(paramsWithFeatureId, res);
});

test("GET /api/feature/:id  returns 200", done => {
  request(app)
    .get('/api/feature/AAABBB')
    .expect(200)
    .then(done)
});
```

This code will stand in for the swagger-tools router, and help build the objects that swagger-tools magically generates when HTTP calls go through it's router. The above code will send an object like below to the `api/controllers/feature.js` controller `protectedGet` function as the first parameter (typically called `args`).

```javascript
{
  swagger: {
    params: {
      auth_payload: {
        scopes: ['sysadmin', 'public'],
        userID: null
      },
      fields: {
        value: ['tags', 'properties', 'applicationID']
      },
      featureId: {
        value: 'AAABBB'
      }
    }
  }
}
```

Unfortunately, this results in a lot of boilerplate code in each of the controller tests. There are some helpers to reduce the amount you need to write, but you will still need to check the parameter field names sent by your middleware router match what the controller(and swagger router) expect. However, this method results in  pretty effective integration tests as they exercise the controller code and save objects in the database.

## Test Database

The tests run on an in-memory MongoDB server, using the [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server) package. The setup can be viewed at [test_helper.js](api/test/test_helper.js), and additional config in [config/mongoose_options.js]. It is currently configured to wipe out the database after each test run to prevent database pollution.

[Factory-Girl](https://github.com/aexmachina/factory-girl) is used to easily create models(persisted to db) for testing purposes.

## Mocking http requests

External http calls (such as GETs to BCGW) are mocked with a tool called [nock](https://github.com/nock/nock). Currently sample JSON responses are stored in the [test/fixtures](test/fixtures) directory. This allows you to intercept a call to an external service such as bcgw, and respond with your own sample data.

```javascript
  const bcgwDomain = 'https://openmaps.gov.bc.ca';
  const searchPath = '/geo/pub/FOOO';
  const crownlandsResponse = require('./fixtures/crownlands_response.json');
  var bcgw = nock(bcgwDomain);
  let dispositionId = 666666;

  beforeEach(() => {
    bcgw.get(searchPath + urlEncodedDispositionId)
      .reply(200, crownlandsResponse);
  });

  test('returns the features data from bcgw', done => {
    request(app).get('/api/public/search/bcgw/dispositionTransactionId/' + dispositionId)
      .expect(200)
      .then(response => {
        let firstFeature = response.body.features[0];
        expect(firstFeature).toHaveProperty('properties');
        expect(firstFeature.properties).toHaveProperty('DISPOSITION_TRANSACTION_SID');
        done();
      });
  });
```

## Configuring Environment Variables

To get all your settings for this project automatically set up, run the file

```bash
#!/bin/bash
./install_prerequisites.sh
```

...or follow the following manual process if you require custom settings:

Recall the environment variables we need for local dev:

1. MINIO_HOST='foo.pathfinder.gov.bc.ca'
1. MINIO_ACCESS_KEY='xxxx'
1. MINIO_SECRET_KEY='xxxx'
1. KEYCLOAK_ENABLED=true
1. MONGODB_DATABASE='epic'

To get actual values for the above fields in the deployed environments, examine the openshift environment you wish to target:

```bash
#!/bin/bash

```

You will not be able to see the above value of the secret if you try examine it.  You will only see the encrypted values.  Approach your team member with admin access in the openshift project in order to get the access key and secret key values for the secret name you got from the above command.  Make sure to ask for the correct environment (dev, test, prod) for the appropriate values.

## Linting (eslint)

```bash
#!/bin/bash
yarn lint
```

Fix linting issues with

```bash
#!/bin/bash
yarn lint --fix
```

## Build and Bundling (Parceljs)

```bash
#!/bin/bash
OUT_DIR=dist/mstask yarn build src/task.api

OUT_DIR=dist/msauth yarn build src/auth.api

OUT_DIR=dist/msmsg yarn build src/msg.api

OUT_DIR=dist/msbill yarn build src/bill.api

OUT_DIR=dist/notify yarn build src/notify.api
```

## Run and Execute (.env)

```bash
#!/bin/bash
yarn serve src/task.api

yarn serve src/auth.api

yarn serve src/msg.api

yarn serve src/notify.api

yarn serve src/bill.api
```

## Run and Execute (production)

Create environment variables

```bash
#!/bin/bash
TASK_API_PORT=8000
APP_NAME=api/microservices
LOG_PATH=/tmp/dgiinilogs
DB_HOST=gru
DB_PORT=27017

```

```bash
#!/bin/bash
node task.api

or

nodemon task.api

```
