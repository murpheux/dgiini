# deploy dgiini application
if [ $# -eq 0 ]
  then
    echo "No arguments supplied"
    exit 0
fi

DIR="release_$1"

if [ -d "$DIR" ]; then

    echo 'releasing current run'
    docker-compose -f $DIR/deploy/docker/docker-compose.yml down

    echo 'remove current deployment files'
    sudo rm -rf $DIR
fi

echo 'download new deployment files'
sudo cp -r /home/jenkins/release/$DIR .

sudo chown -R murpheux:murpheux $DIR
sudo chmod -R 755 $DIR

echo 'start new run'
docker-compose -f $DIR/deploy/docker/docker-compose.yml up -d

echo 'done'