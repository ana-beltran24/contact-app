FROM node:18

WORKDIR /app

COPY API/package*.json ./

RUN npm install

COPY API ./

RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run", "dev"]
