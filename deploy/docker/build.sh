#!/bin/bash
currentBuildNumber=$(ls -d release_* | sed -e 's/[^0-9]//g')

re='^[0-9]+$'
if [[ $currentBuildNumber =~ $re ]] ; then
    cd release_${currentBuildNumber}/archive/deploy/docker

    # build images
    docker build --no-cache -f web_dockerfile -t dgiini/web:${currentBuildNumber} .
    docker build --no-cache -f gw_dockerfile -t dgiini/apigw:${currentBuildNumber} .
    docker build --no-cache -f auth_dockerfile -t dgiini/auth:${currentBuildNumber} .
    docker build --no-cache -f task_dockerfile -t dgiini/task:${currentBuildNumber} .
    docker build --no-cache -f msg_dockerfile -t dgiini/msg:${currentBuildNumber} .
    docker build --no-cache -f notify_dockerfile -t dgiini/notify:${currentBuildNumber} .
    docker build --no-cache -f bill_dockerfile -t dgiini/bill:${currentBuildNumber} .

    # tag images
    docker tag dgiini/web:${currentBuildNumber} gru:5000/dgiini/web:${currentBuildNumber}
    docker tag dgiini/apigw:${currentBuildNumber} gru:5000/dgiini/apigw:${currentBuildNumber}
    docker tag dgiini/auth:${currentBuildNumber} gru:5000/dgiini/auth:${currentBuildNumber}
    docker tag dgiini/task:${currentBuildNumber} gru:5000/dgiini/task:${currentBuildNumber}
    docker tag dgiini/msg:${currentBuildNumber} gru:5000/dgiini/msg:${currentBuildNumber}
    docker tag dgiini/notify:${currentBuildNumber} gru:5000/dgiini/notify:${currentBuildNumber}
    docker tag dgiini/bill:${currentBuildNumber} gru:5000/dgiini/bill:${currentBuildNumber}

    docker tag dgiini/web:${currentBuildNumber} murpheux/dgiini_web:${currentBuildNumber}
    docker tag dgiini/apigw:${currentBuildNumber} murpheux/dgiini_apigw:${currentBuildNumber}
    docker tag dgiini/auth:${currentBuildNumber} murpheux/dgiini_auth:${currentBuildNumber}
    docker tag dgiini/task:${currentBuildNumber} murpheux/dgiini_task:${currentBuildNumber}
    docker tag dgiini/msg:${currentBuildNumber} murpheux/dgiini_msg:${currentBuildNumber}
    docker tag dgiini/notify:${currentBuildNumber} murpheux/dgiini_notify:${currentBuildNumber}
    docker tag dgiini/bill:${currentBuildNumber} murpheux/dgiini_bill:${currentBuildNumber}

    #push to repository
    docker push gru:5000/dgiini/web:${currentBuildNumber}
    docker push gru:5000/dgiini/apigw:${currentBuildNumber}
    docker push gru:5000/dgiini/auth:${currentBuildNumber}
    docker push gru:5000/dgiini/task:${currentBuildNumber}
    docker push gru:5000/dgiini/msg:${currentBuildNumber}
    docker push gru:5000/dgiini/notify:${currentBuildNumber}
    docker push gru:5000/dgiini/bill:${currentBuildNumber}

    docker push murpheux/dgiini_web:${currentBuildNumber}
    docker push murpheux/dgiini_apigw:${currentBuildNumber}
    docker push murpheux/dgiini_auth:${currentBuildNumber}
    docker push murpheux/dgiini_task:${currentBuildNumber}
    docker push murpheux/dgiini_msg:${currentBuildNumber}
    docker push murpheux/dgiini_notify:${currentBuildNumber}
    docker push murpheux/dgiini_bill:${currentBuildNumber}

    cd -
else
    echo 'Error! Unable to retrieve dgiini build version number!'
    echo 'Ensure release_??? folder is available in working directory.'
fi