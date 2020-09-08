FROM node:13.10.1-alpine3.10

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 5000

CMD [ "npm", "start" ]