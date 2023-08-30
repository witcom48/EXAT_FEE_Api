#FROM node:boron
FROM node:18.13-slim
#FROM node:12.18.1
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .
EXPOSE 5000
CMD [ "node", "index.js" ]