FROM node:lts

WORKDIR /app

COPY ./matcha/package*.json /app

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]