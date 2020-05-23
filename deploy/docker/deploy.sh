#!/bin/bash

# ansi color code
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NOCOLOR='\033[0m' # No Color

# prepare version
latestBuildNumber=$(curl --user murpheux:$JK_TOKEN http://gru:8088/job/dgiini-dev-docker/lastBuild/buildNumber)

export DGIINI_VERSION=$latestBuildNumber

echo -e "=> ${YELLOW}version $DGIINI_VERSION discovered and ready to deploy ...${NOCOLOR}"

# remove previous deployment
docker stack rm dgiini

# sleep
echo -e "=> ${YELLOW}waiting ...${NOCOLOR}"
sleep 10

docker stack deploy --compose-file docker-swarm.yml dgiini
echo -e "=> ${GREEN}done!${NOCOLOR}"
