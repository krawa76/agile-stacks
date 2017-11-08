# docker.io/krawa/as-web

FROM alpine
LABEL maintainer="krawa@krawa.net"
RUN apk add --update nodejs nodejs-npm
COPY . /src
WORKDIR /src
RUN npm install
EXPOSE 3000
ENTRYPOINT ["node", "./index.js"]
