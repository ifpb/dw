FROM node:lts-alpine

ENV NODE_ENV=production

RUN apk --no-cache add sqlite

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install --production --silent && mv node_modules ../

COPY . .

RUN npx prisma generate

EXPOSE 3000

RUN chown -R node /usr/src/app

USER node

CMD ["npm", "start"]
