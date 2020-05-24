#! /bin/sh

if [ $# -eq 0 ]
  then
    echo "No arguments supplied"
    exit
fi

mongoimport --host $1 --db dg_authdb --collection tasks --file user.json --jsonArray
mongoimport --host $1 --db dg_taskdb --collection tasks --file task.json --jsonArray
mongoimport --host $1 --db dg_authdb --collection tasks --file ratings.json --jsonArray
mongoimport --host $1 --db dg_messagedb --collection tasks --file message.json --jsonArray