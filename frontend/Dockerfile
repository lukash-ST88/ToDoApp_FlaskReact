FROM node:20.8.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app
RUN npm install --silent

COPY . /app

CMD ["npm", "start"]