FROM node:9.11.2-jessie

# Create app directory
# RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# ENV PATH="$PATH:/usr/src/app/node_modules/.bin"
# COPY ../../api_gateway/package.json /usr/src/app
# RUN cd /usr/src/app && npm install

# RUN npm install
# If you are building your code for production
# RUN npm install --only=production

RUN npm install -g yarn
# RUN npm install -g pm2@1.1.3

# VOLUME ["/app"]
# ADD start /start
# RUN chmod 755 /start
# CMD ["/start"]

# Bundle app source
#COPY ../../api_gateway /usr/src/app 

#EXPOSE 80 443
#CMD [ "npm", "start" ]