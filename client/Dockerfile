FROM node:16-alpine as builder

WORKDIR /app

COPY client/package*.json ./

RUN npm install --force

COPY client/ .

RUN npm run build

FROM nginx

WORKDIR /app

RUN mkdir ./build

COPY --from=builder /app/dist ./build

RUN rm /etc/nginx/conf.d/default.conf

COPY client/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]