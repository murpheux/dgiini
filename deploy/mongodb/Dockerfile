FROM mongo:4.2.0-bionic

COPY  ${PWD}/mongo-keyfile /opt/mongo/mongo-keyfile
COPY  ${PWD}/mongod.conf /etc/mongod.conf

ENV REPLICA_CONFIG={"_id":"dbrepl","members":[{"_id":0,"host":"dgiinidb0:27017"},{"_id":1,"host":"dgiinidb1:27017"},{"_id":2,"host":"dgiinidb2:27017"}]}