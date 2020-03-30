#!/bin/bash

# ansi color code
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NOCOLOR='\033[0m' # No Color

# get current build number
currentBuildNumber=$(ls -d release_* | sed -e 's/[^0-9]//g')

# get latest build number
latestBuildNumber=$(curl --user murpheux:$JK_TOKEN http://gru:8088/job/dgiini-dev-docker/lastBuild/buildNumber)

if [[ $currentBuildNumber == $latestBuildNumber ]]; then
    echo -e "=> ${YELLOW}Build folder already exist in current folder ...${NOCOLOR}"
    exit 1
fi

re='^[0-9]+$'
if ! [[ $currentBuildNumber =~ $re ]] ; then
    currentBuildNumber=$latestBuildNumber
fi

CURR_DIR="release_$currentBuildNumber"
NEW_DIR="release_$latestBuildNumber"

echo "deploying $currentBuildNumber => $latestBuildNumber ..."

if [ -d "$CURR_DIR" ]; then

    # echo 'releasing current run'
    # docker-compose -H sclet:2375 -f $CURR_DIR/archive/deploy/docker/docker-compose.yml down

    echo 'remove previous build images'
    docker rmi gru:5000/dgiini/web:$currentBuildNumber gru:5000/dgiini/auth:$currentBuildNumber \
        gru:5000/dgiini/task:$currentBuildNumber gru:5000/dgiini/msg:$currentBuildNumber gru:5000/dgiini/notify:$currentBuildNumber \
        gru:5000/dgiini/bill:$currentBuildNumber gru:5000/dgiini/apigw:$currentBuildNumber
        
    docker rmi dgiini/web:$currentBuildNumber dgiini/auth:$currentBuildNumber \
        dgiini/task:$currentBuildNumber dgiini/msg:$currentBuildNumber dgiini/notify:$currentBuildNumber \
        dgiini/bill:$currentBuildNumber dgiini/apigw:$currentBuildNumber

    echo 'remove current deployment files'
    rm -rf $CURR_DIR
fi

curl --user murpheux:$JK_TOKEN -O http://gru:8088/job/dgiini-dev-docker/lastSuccessfulBuild/artifact/\*zip\*/release_$latestBuildNumber.zip

# unzip archives
unzip release_$latestBuildNumber.zip -d release_$latestBuildNumber && rm release_$latestBuildNumber.zip
cd release_$latestBuildNumber/archive

# unzip sub-archives
unzip deploy.zip -d deploy && rm deploy.zip
unzip apigw.zip -d apigw && rm apigw.zip
unzip mstask.zip -d mstask && rm mstask.zip
unzip msauth.zip -d msauth && rm msauth.zip
unzip msmsg.zip -d msmsg && rm msmsg.zip
unzip msnotify.zip -d msnotify && rm msnotify.zip
unzip msbill.zip -d msbill && rm msbill.zip
unzip web.zip -d web && rm web.zip

mkdir -p deploy/docker/app
# cp deploy/nginx/dgiini.template deploy/docker/app
mv apigw deploy/docker/app
mv msauth deploy/docker/app
mv mstask deploy/docker/app
mv msmsg deploy/docker/app
mv msnotify deploy/docker/app
mv msbill deploy/docker/app
mv web deploy/docker/app

cd ../../

# sudo chown -R murpheux:murpheux $NEW_DIR
chmod -R 755 $NEW_DIR

# set env to current version
export DGIINI_VERSION=$latestBuildNumber