FROM node:18

WORKDIR /app

COPY . .

COPY ./package*.json .

RUN npm install

CMD ["node", "--watch", "app.js"]