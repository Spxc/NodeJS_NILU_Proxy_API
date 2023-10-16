FROM node:16

WORKDIR /docker

COPY ./package.json .
RUN npm cache clean --force
RUN npm install
COPY . .

EXPOSE 3000 8080

# CMD npm start
CMD [ "node", "app.js" ]