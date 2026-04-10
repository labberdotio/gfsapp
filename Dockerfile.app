
# 
# https://mherman.org/blog/dockerizing-a-react-app/
# 
# > docker build -t gremlinfs-uibuilder-dev:latest -f Dockerfile.builder .
# > docker network create -d bridge gremlinfs
# > docker run -itd --rm -e GFS_FS_NAME=gfs1 -e GFS_API_HOST=server -e GFS_API_PORT=5000 --net=gremlinfs -p 3000:3000 gremlinfs-ui-dev:latest
# 

# pull official base image
# FROM node:13.12.0-alpine
# FROM node:14.18.2-alpine
# FROM node:16.14.2-alpine
# FROM node:16.20.2-alpine
# FROM node:18.20.3-alpine
# FROM node:20.16.0-alpine
FROM node:22.22.1-trixie

ENV REACT_APP_GFS_FS_NAME="gfs1"
ENV REACT_APP_GFS_API_HOST="gfs.testing.localdomain"
ENV REACT_APP_GFS_API_PORT="5000"
ENV REACT_APP_GFS_API_USERNAME=""
ENV REACT_APP_GFS_API_PASSWORD=""
ENV REACT_APP_GFS_WS_HOST="gfs.testing.localdomain"
ENV REACT_APP_GFS_WS_PORT="5002"
ENV REACT_APP_GFS_WS_USERNAME=""
ENV REACT_APP_GFS_WS_PASSWORD=""
ENV REACT_APP_GFS_AUTH_HOST="gfs.testing.localdomain"
ENV REACT_APP_GFS_AUTH_PORT="5003"
ENV REACT_APP_GFS_AUTH_CLIENT="org.name.client1"
ENV REACT_APP_GFS_AUTH_SECRET="secret"

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY ./ ./

# Initialize environment variables into filesystem
WORKDIR /app
COPY ./env.sh .
COPY ./.env .

# Add bash
# RUN apk add --no-cache bash
RUN apt-get update
RUN apt-get install -y bash

# build
# RUN npm run build

# Run script which initializes env vars to fs
RUN chmod +x env.sh
# RUN ./env.sh

# start app
# CMD ["npm", "start"]
CMD ["/bin/bash", "-c", "/app/env.sh && cp env-config.js /app/public/ && npm start"]
