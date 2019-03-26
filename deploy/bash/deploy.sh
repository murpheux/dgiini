# deploy qtaskr application
if [ $# -eq 0 ]
  then
    echo "No arguments supplied"
    exit 0
fi

mkdir -p install
tstamp = date "+%Y-%m-%d_%H_%M_%S"

echo 'starting...'

#install web, apigw and microservices
echo 'deploying web...'
./deploy_web.sh $1 $tstamp

echo 'deploying API gateway...'
./deploy_apigw.sh $1 $tstamp

echo 'deploying micro services...'
./deploy_ms.sh $1 $tstamp

echo 'done!'