FROM node:20-alpine

# Instala ferramentas necessárias para compilar pacotes nativos (node-gyp)
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
