FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY env.js.tpl /usr/share/nginx/html/env.js.tpl


COPY entrypoint.sh /entrypoint.sh

COPY --from=builder /app/dist /usr/share/nginx/html

RUN chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
