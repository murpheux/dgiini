# deploy dgiini micro services
if [ $# -eq 0 ]
  then
    echo "No arguments supplied"
    exit 0
fi

# extract tar file to folder
mkdir -p install/install_$1/$2/ms/auth
tar -zxvf dgiini_$1/ms/dist/dgiini_microservices-0.1.0.tar.gz --directory install/install_$1/$2/ms/auth  --strip 1
cp dgiini_$1/ms/dist/version.txt install/install_$1/$2/ms/auth/

mkdir -p install/install_$1/$2/ms/task
cp -r install/install_$1/$2/ms/auth/* install/install_$1/$2/ms/task
cp dgiini_$1/ms/dist/version.txt install/install_$1/$2/ms/task/

mkdir -p install/install_$1/$2/ms/notify
cp -r install/install_$1/$2/ms/auth/* install/install_$1/$2/ms/notify
cp dgiini_$1/ms/dist/version.txt install/install_$1/$2/ms/notify/

mkdir -p install/install_$1/$2/ms/bill
cp -r install/install_$1/$2/ms/auth/* install/install_$1/$2/ms/bill
cp dgiini_$1/ms/dist/version.txt install/install_$1/$2/ms/bill/

rm install/install_$1/$2/ms/auth/task_v1.py
rm install/install_$1/$2/ms/auth/notify_v1.py
rm install/install_$1/$2/ms/auth/bill_v1.py

rm install/install_$1/$2/ms/task/auth_v1.py
rm install/install_$1/$2/ms/task/notify_v1.py
rm install/install_$1/$2/ms/task/bill_v1.py

rm install/install_$1/$2/ms/notify/auth_v1.py
rm install/install_$1/$2/ms/notify/task_v1.py
rm install/install_$1/$2/ms/notify/bill_v1.py

rm install/install_$1/$2/ms/bill/auth_v1.py
rm install/install_$1/$2/ms/bill/task_v1.py
rm install/install_$1/$2/ms/bill/notify_v1.py