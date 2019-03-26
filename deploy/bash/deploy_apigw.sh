# deploy qtaskr api gateway
if [ $# -eq 0 ]
  then
    echo "No arguments supplied"
    exit 0
fi

mkdir -p install/install_$1/$2/apigw
cp -r qtaskr_$1/apigw/dist/* install/install_$1/$2/apigw
