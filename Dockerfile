FROM node:14.10-alpine

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .