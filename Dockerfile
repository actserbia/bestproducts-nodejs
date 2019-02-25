FROM mhart/alpine-node:10

ENV APP_ROOT /src

RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories && \
  apk update && \
  apk upgrade && \
  apk add curl 

RUN curl -fsSLO https://get.docker.com/builds/Linux/x86_64/docker-17.04.0-ce.tgz \
  && tar xzvf docker-17.04.0-ce.tgz \
  && mv docker/docker /usr/local/bin \
  && rm -r docker docker-17.04.0-ce.tgz

RUN mkdir ${APP_ROOT}

WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

ENV HOST 0.0.0.0
ENV NODE_ENV=production

EXPOSE 3000
CMD [ "npm", "start" ]
