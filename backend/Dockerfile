FROM node:lts

WORKDIR /app

COPY ./package*.json /app

COPY . .

RUN npm install

CMD ["node", "--watch", "app.js"]