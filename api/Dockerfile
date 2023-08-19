FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN npm install --no-cache-dir 

COPY . .

ENV PORT=8080  MONGO_URI=mongodb+srv://kalwarsushil2:sushil69@nodeexpressproject.chjptls.mongodb.net/dendrite?retryWrites=true&w=majority

EXPOSE 8080

CMD [ "npm", "start" ]