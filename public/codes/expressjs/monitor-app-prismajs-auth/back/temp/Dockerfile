FROM node:lts-alpine3.19

RUN apk --no-cache add sqlite

WORKDIR /usr/app/

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]
