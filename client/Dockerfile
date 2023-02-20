FROM node:18.14.1

WORKDIR /chatapp_frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]
