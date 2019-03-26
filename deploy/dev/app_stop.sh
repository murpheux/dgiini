#!/bin/bash
PIDS=$(ps aux | grep auth_v1 | grep -v grep | awk '{print $2}')
PID=$(echo $PIDS | awk '{print $1}')
if ! [ -z "$PID" ]; then kill -9 $PID >/dev/null 2>&1; fi


PIDS=$(ps aux | grep task_v1 | grep -v grep | awk '{print $2}')
PID=$(echo $PIDS | awk '{print $1}')
if ! [ -z "$PID" ]; then kill -9 $PID >/dev/null 2>&1; fi


PIDS=$(ps aux | grep bill_v1 | grep -v grep | awk '{print $2}')
PID=$(echo $PIDS | awk '{print $1}')
if ! [ -z "$PID" ]; then kill -9 $PID >/dev/null 2>&1; fi


PIDS=$(ps aux | grep notify_v1 | grep -v grep | awk '{print $2}')
PID=$(echo $PIDS | awk '{print $1}')
if ! [ -z "$PID" ]; then kill -9 $PID >/dev/null 2>&1; fi

#re='^[0-9]+([.][0-9]+)?$' 
#if ![[$PID  =~ $re ]]; then
#    exit 0
#else
#    kill -9 $PID >/dev/null 2>&1
#fi

exit 0