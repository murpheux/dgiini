FROM node:13.7.0 as task-api-build
RUN mkdir /app
WORKDIR /app
COPY ../ms/src /app
RUN npm install --only=production
RUN npm build

FROM nginx:alpine
RUN apk add --no-cache bash
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=vue-build /app/dist/spa /usr/share/nginx/html
EXPOSE 80

WORKDIR /usr/share/nginx/html
CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""] 
