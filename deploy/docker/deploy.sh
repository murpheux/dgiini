# get current build number
currentBuildNumber=$(ls -d release_* | sed -e 's/[^0-9]//g')

# get latest build number
latestBuildNumber=$(curl --user murpheux:$JK_TOKEN http://gru:8088/job/dgiini/lastBuild/buildNumber)

re='^[0-9]+$'
if ! [[ $currentBuildNumber =~ $re ]] ; then
    CURR_DIR="release_$latestBuildNumber"
else
    CURR_DIR="release_$currentBuildNumber"
fi

NEW_DIR="release_$latestBuildNumber"


if [ -d "$CURR_DIR" ]; then

    echo 'releasing current run'
    docker-compose -H sclet:2375 -f $CURR_DIR/archive/deploy/docker/docker-compose.yml down

    echo 'remove current deployment files'
    sudo rm -rf $CURR_DIR
fi

curl --user murpheux:$JK_TOKEN -O http://gru:8088/job/dgiini/lastSuccessfulBuild/artifact/\*zip\*/release_$latestBuildNumber.zip

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
unzip msbill.zip -d msnbill && rm msbill.zip
unzip web.zip -d web && rm web.zip

cd ../../

#sudo chown -R murpheux:murpheux $NEW_DIR
sudo chmod -R 755 $NEW_DIR

echo 'start new run'
docker-compose -H sclet:2375 -f $NEW_DIR/archive/deploy/docker/docker-compose.yml up -d

echo 'done'
