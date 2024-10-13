FROM node:lts

WORKDIR /app

COPY ./package*.json /app

RUN npm install

COPY . .

CMD ["node", "--watch", "app.js"]