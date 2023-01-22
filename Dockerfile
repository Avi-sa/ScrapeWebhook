FROM node:16-alpine
RUN mkdir /grpc
COPY ./ /grpc
WORKDIR /grpc/
RUN npm install
CMD ["node", "server.js"]
