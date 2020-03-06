FROM node:13.10.1-stretch

WORKDIR /usr/src/app

COPY ../../apigw/ /usr/src/app

RUN npm install --only=production

CMD [ "node", "start" ]