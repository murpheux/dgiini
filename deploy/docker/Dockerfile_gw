FROM node:13.10.1-stretch

WORKDIR /usr/src/app

COPY app/apigw/ /usr/src/app

RUN npm install --only=production

CMD [ "node", "start" ]