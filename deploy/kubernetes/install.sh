#! /bin/sh
helm --kubeconfig=/Users/murpheux/.kube/k8s-1-18-8-do-1-sfo2-1602808957989-kubeconfig.yaml install helm --generate-name --set version=$1

# usage
# ./install.sh <build number>
# ./install.sh $DGIINI_VERSION