FROM node:20

RUN mkdir /app
WORKDIR /app
ADD server.js /app/server.js
ADD package.json /app/package.json
ADD package-lock.json /app/package-lock.json
RUN npm i
ENTRYPOINT ["node", "server.js"]