FROM node:26-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --prefer-offline --no-audit

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]