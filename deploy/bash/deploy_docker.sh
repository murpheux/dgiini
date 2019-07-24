# deploy dgiini application
if [ $# -lt 2 ]
  then
    echo "Arguments missing ..."
    exit 0
fi

CURR_DIR="release_$1"
NEW_DIR="release_$2"

if [ -d "$CURR_DIR" ]; then

    echo 'releasing current run'
    docker-compose -f $CURR_DIR/deploy/docker/docker-compose.yml down

    echo 'remove current deployment files'
    sudo rm -rf $CURR_DIR
fi

echo 'download new deployment files'
sudo cp -r /home/jenkins/release/$NEW_DIR .

sudo chown -R murpheux:murpheux $NEW_DIR
sudo chmod -R 755 $NEW_DIR

echo 'start new run'
docker-compose -f $NEW_DIR/deploy/docker/docker-compose.yml up -d

echo 'done'