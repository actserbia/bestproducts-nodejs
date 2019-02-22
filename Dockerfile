FROM mhart/alpine-node:10

ENV APP_ROOT /src


RUN mkdir ${APP_ROOT}

WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN npm install
RUN npm run build

ENV HOST 0.0.0.0
ENV NODE_ENV=production

EXPOSE 3000
CMD [ "npm", "start" ]
