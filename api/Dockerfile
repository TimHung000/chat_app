FROM node:18.14.1

WORKDIR /chatapp_backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8800

CMD [ "npm", "start" ]
