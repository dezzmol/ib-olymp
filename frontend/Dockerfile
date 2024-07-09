FROM node:22-alpine as build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build


FROM nginx:alpine

COPY ./.nginx/nginx.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
COPY /etc/letsencrypt/live/fullchain.pem /etc/ssl/certs/fullchain.pem
COPY /etc/letsencrypt/live/privkey.pem /etc/ssl/private/privkey.pem

EXPOSE 80
EXPOSE 433
CMD ["nginx", "-g", "daemon off;"]
