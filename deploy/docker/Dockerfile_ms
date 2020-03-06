FROM node:13.10.1-stretch
ARG $APPNAME
ARG $APPFILE

WORKDIR /usr/src/app

COPY app/$APPNAME/ /usr/src/app

RUN npm install --only=production

CMD [ "node", $APPFILE ]