FROM nginx:1.17.9
ARG $RELFOLDER

WORKDIR /usr/src/app

COPY ../../web/ /usr/src/app
COPY ./nginx/dgiini.template /etc/nginx/conf.d/dgiini.template