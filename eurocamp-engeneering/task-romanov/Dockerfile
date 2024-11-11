FROM node:22-alpine

WORKDIR /task-romanov

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD npm run start:watch
