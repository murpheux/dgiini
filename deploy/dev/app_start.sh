#!/bin/bash
# script to start app services

cd $QTASKR_HOME/deployment/docker

# start database - mongo
docker-compose up -d db

# start microservices
cd ../../service
python3 seed.py localhost:27017 localhost:27017 localhost:27017

gunicorn --certfile=certs/qtaskr.crt --keyfile=certs/private.key --workers=1 --bind 0.0.0.0:7000 auth_v1:api &
gunicorn --certfile=certs/qtaskr.crt --keyfile=certs/private.key --workers=1 --bind 0.0.0.0:7001 task_v1:api &
#gunicorn --certfile=certs/qtaskr.crt --keyfile=certs/private.key --workers=1 --bind 0.0.0.0:7002 bill_v1:api &
gunicorn --certfile=certs/qtaskr.crt --keyfile=certs/private.key --workers=1 --bind 0.0.0.0:7003 notify_v1:api &

# start api gateway
cd ../api_gateway
node api_v1.js &

# start php
cd ../webui
php -S 0.0.0.0:9000 &

cd $QTASKR_HOME