FROM node:13.12.0-alpine

WORKDIR /usr/src/app

COPY . ./

RUN npm install --silent

EXPOSE 3000

CMD ["npm", "start"]