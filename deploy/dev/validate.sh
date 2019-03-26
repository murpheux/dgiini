#!/bin/bash
status_code=curl -k  --silent --head https://localhost:7000/api | grep HTTP/ | awk '{print $2}'

if [[ $status_ code == "200" ]]; then
    exit 0
else
    exit 1
fi