FROM node:16-alpine
WORKDIR /app
COPY package.json /
COPY .env /
COPY index.js /
RUN npm install
EXPOSE 9700
ENTRYPOINT ["npm", "start"]
