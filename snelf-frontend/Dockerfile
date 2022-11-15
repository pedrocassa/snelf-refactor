FROM node:14-alpine

WORKDIR /front_app

COPY package*.json ./

RUN npm install \
    && npm install react-plotly.js plotly.js

COPY ./ .

RUN npm run build

EXPOSE 3000

CMD ["npm","start"]