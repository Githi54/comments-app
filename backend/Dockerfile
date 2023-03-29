FROM node:18.14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

COPY ./dist ./dist

CMD [ "npm", "run", "start:dev" ]