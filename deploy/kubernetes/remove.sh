#! /bin/sh
helm --kubeconfig=/Users/murpheux/.kube/k8s-1-18-8-do-1-sfo2-1602808957989-kubeconfig.yaml uninstall $1

# usage
# ./remove.sh $(helm ls | awk 'NR==2 {print $1}')