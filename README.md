# ::: dgiini

## dgiini web application

Application desgined using microservice architecture with SPA front-end and mongo db database. Apps has the followings microservices

* Authentication microservice
* Task microservice
* Message microservice
* Notify microservice
* Billing microservice

Architecture is as shown below
![architecture](docs/dgiini-Architectecture.png)

## Pre-requisite package version

```none
nodejs -> 13.7.0
yarn -> 1.12.1
angular -> in package file
typescript ->  in package file
```

## Provider Services

* Location
* Payment
* Messaging
  * Email
  * SMS

## Local Dev Run

### > Web

## Prerequisite

```bash
#!/bin/bash
$ cd web
$ npm install

or

$ yarn
```

and run web app

```bash
#!/bin/bash
$ ng serve
```

### > microservices

#### microservice Prerequisite

```bash
#!/bin/bash
$ cd ms
$ yarn dev src/task_api &

$ yarn dev src/msg_api &

$ yarn dev src/auth_api &

$ yarn dev src/notify_api &
```

## Database

Recommended database of choice is mongodb or any other related document database provided by the adopted cloud provider.

### Connect to database

```bash
#!/bin/bash
mongo --host <database hostname or ip address>
```

### Drop database

```mongo
use <database name>
db.dropDatabase()
```

### Load database dump

1. Download and unzip archived dump file.
2. Restore the dump into your local mongo:

```bash
#!/bin/bash
mongorestore -d epic epic/
```

### Data Generation

mongodb-dataset-generator is an npm package and is used for the generation of sample raw data in dev and test for the purpose of testing.

This can be aliased to "mgen"

```bash
#!/bin/bash
alias mgen=mongodb-dataset-generator
```

```bash
#!/bin/bash
$ mgen deploy/data/task_schema.json -n 10 -o tmp/task.json
```

#### Upload generated data to mongodb

```bash
#!/bin/bash
$ mongoimport --host gru --db dg_taskdb --collection tasks --file tmp/task.json  --jsonArray
```

...Note: --jsonArray is important

## Configuring Environment Variables

Environment variables provided by .env file for micro-services. This can be overriden in any environment with equivalent environment variables.

Refer to .env file for details of environment variables.
