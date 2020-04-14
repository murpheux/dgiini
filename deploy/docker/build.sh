#!/bin/bash

# ansi color code
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NOCOLOR='\033[0m' # No Color

currentBuildNumber=$(ls -d release_* | sed -e 's/[^0-9]//g')

re='^[0-9]+$'
if [[ $currentBuildNumber =~ $re ]] ; then

    # check if image already exist
    imagesFound=$(docker images --filter=reference='gru:5000/dgiini/*:*${currentBuildNumber}' | awk '{print $3}' | wc -l)

    if [[ imagesFound < 2 ]] ; then
        echo -e "=> ${YELLOW}Previous build image exist. Remove it if you need a rebuild.${NOCOLOR}"
        exit 1
    fi

    cd release_${currentBuildNumber}/archive/deploy/docker

    # build images
    docker build --no-cache -f web_dockerfile -t dgiini/web:${currentBuildNumber} -t gru:5000/dgiini/web:${currentBuildNumber} .
    docker build --no-cache -f gw_dockerfile -t dgiini/apigw:${currentBuildNumber} -t gru:5000/dgiini/apigw:${currentBuildNumber} .
    docker build --no-cache -f auth_dockerfile -t dgiini/auth:${currentBuildNumber} -t gru:5000/dgiini/auth:${currentBuildNumber} .
    docker build --no-cache -f task_dockerfile -t dgiini/task:${currentBuildNumber} -t gru:5000/dgiini/task:${currentBuildNumber} .
    docker build --no-cache -f msg_dockerfile -t dgiini/msg:${currentBuildNumber} -t gru:5000/dgiini/msg:${currentBuildNumber} .
    docker build --no-cache -f notify_dockerfile -t dgiini/notify:${currentBuildNumber} -t gru:5000/dgiini/notify:${currentBuildNumber} .
    docker build --no-cache -f bill_dockerfile -t dgiini/bill:${currentBuildNumber} -t gru:5000/dgiini/bill:${currentBuildNumber} .

    # push to repository
    docker push gru:5000/dgiini/web:${currentBuildNumber}
    docker push gru:5000/dgiini/apigw:${currentBuildNumber}
    docker push gru:5000/dgiini/auth:${currentBuildNumber}
    docker push gru:5000/dgiini/task:${currentBuildNumber}
    docker push gru:5000/dgiini/msg:${currentBuildNumber}
    docker push gru:5000/dgiini/notify:${currentBuildNumber}
    docker push gru:5000/dgiini/bill:${currentBuildNumber}

    cd -
else
    echo 'Error! Unable to retrieve dgiini build version number!'
    echo 'Ensure release_??? folder is available in working directory.'
fi