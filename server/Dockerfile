FROM node:16-alpine
WORKDIR /src
COPY package.json /src
COPY .env /src
COPY index.js /src
COPY swap /src/swap/
RUN npm install
EXPOSE 9700
ENTRYPOINT ["npm", "start"]
