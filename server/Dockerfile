FROM node:16-alpine
WORKDIR /app
COPY package.json /src
COPY .env /src
COPY index.js /src
RUN npm install
EXPOSE 9700
ENTRYPOINT ["npm", "start"]
