FROM node:10.14.1

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
RUN yarn

COPY ./ /app

# ENV NODE_PATH /app/node_modules/
# ENV NODE_PATH /usr/lib/node_modules/

RUN yarn run build-p

ENTRYPOINT ["yarn", "run", "start"]
