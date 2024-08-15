FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN npm prune --production && \
    npm cache clean --force

RUN rm -rf /var/cache/apk/* /tmp/* /var/tmp/*
