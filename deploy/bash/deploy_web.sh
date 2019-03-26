# deploy qtaskr pho web
if [ $# -eq 0 ]
  then
    echo "No arguments supplied"
    exit 0
fi

mkdir -p install/install_$1/$2/webui
tar -zxvf qtaskr_$1/webui/dist/webui.tar.gz --directory install/install_$1/$2/webui  --strip 1
cp qtaskr_$1/webui/dist/version.txt install/install_$1/$2/webui/