FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY .env .env


COPY . .

RUN npm run build

EXPOSE 5173

RUN npm install -g serve

CMD ["serve", "-s", "dist", "-p", "5173"]