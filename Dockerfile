FROM node:16-alpine
RUN apk add g++ make py3-pip
RUN mkdir /grpc
COPY ./ /grpc
WORKDIR /grpc/
RUN npm install
CMD ["node", "server.js"]
