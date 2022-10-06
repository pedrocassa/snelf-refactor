FROM node:14-alpine

RUN mkdir /front_app

WORKDIR /front_app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# EXPOSE 8080

# ENV NUXT_HOST=0.0.0.0

# ENV NUXT_PORT=8080

# ENV PROXY_API='http://localhost:8080/'

# ENV PROXY_LOGIN='http://localhost:8080/'

CMD ["npm","start"]