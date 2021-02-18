FROM node:slim

RUN apt update && apt install -y procps

WORKDIR /usr/app/

COPY . .

RUN npm install

EXPOSE 3000

# CMD ["npm", "run", "start"]
CMD ["npm", "run", "dev"]
