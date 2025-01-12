FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY .env .env

EXPOSE 3003

HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3003/health || exit 1
  
CMD ["npm", "run", "start:prod"]
