#!/bin/bash
# script to start app services

cd $DGIINI_HOME/deployment/docker

# start database - mongo
docker-compose up -d db

# prepare default databases
cd ../data
python3 seed.py scarlet scarlet scarlet scarlet


# start microservices
#node -r esm auth_v1:api &
node -r esm task_v1:api &
node -r esm bill_v1:api &
node -r esm notify_v1:api &

# start api gateway: kong/tyke


# start php
cd ../web
ng serve &

cd $DGIINI_HOME