#! /bin/sh

if [ ! -d "output" ] 
then
    mkdir output
fi

mongodb-dataset-generator user_schema.json -n 1   -o output/user.json
mongodb-dataset-generator task_schema.json -n 200 -o output/task.json
mongodb-dataset-generator rating_schema.json -n 1000 -o output/ratings.json
mongodb-dataset-generator msg_schema.json -n 1000 -o output/message.json