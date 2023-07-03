FROM node:16-alpine
WORKDIR /app
COPY components components/
COPY assets assets/
COPY hooks hooks/
COPY pages pages/
COPY public public/
COPY queries queries/
COPY schemas schemas/
COPY screens screens/
COPY styles styles/
COPY ui ui/
COPY utils utils/
COPY web3 web3/
COPY .env .
COPY *.json .
COPY .graphclientrc.yml .
COPY *.js .
COPY next-env.d.ts .
RUN yarn install
RUN yarn build
EXPOSE 38322
ENTRYPOINT yarn start -p 38322
