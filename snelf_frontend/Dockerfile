FROM node:14-alpine

WORKDIR /front_app

COPY package*.json ./

RUN npm install \
    && npm i --save-dev "react@^18.2.0" \
    && npm i --save-dev "typescript@>= 2.7" \
    && npm i --save-dev "ajv@>=8" \
    && npm i react-plotly.js plotly.js \
    && npm i @react-pdf/renderer --save \
    && npm i assert --save \
    && npm i xlsx


COPY ./ .

RUN npm run build

EXPOSE 3000

CMD ["npm","start"]