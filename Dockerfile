FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --no-cache-dir

COPY . .

ENV REACT_APP_API_URL='http://localhost:5000'

EXPOSE 3000

CMD ["pnpm", "run", "start"]
