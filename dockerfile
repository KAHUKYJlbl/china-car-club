FROM node

WORKDIR /app

ENV API_URL='https://admin.new.chinacar.club/api/calc/manufacturers'
ENV STATIC_URL='https://admin.new.chinacar.club/storage/specification'

COPY package.json /app

RUN npm i

COPY . .

EXPOSE 80

CMD [ "npm", "run", "build" ]
