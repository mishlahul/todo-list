FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3030
RUN chmod +x entrypoint.sh
CMD ["./entrypoint.sh"]
