FROM node:16-alpine As development


WORKDIR /usr/src/app

COPY ./package.json ./package-lock.json ./

RUN npm install #--only=development

COPY . .

EXPOSE 3000

# CMD ["npm", "run", "start:dev"]
RUN npm run build


FROM node:16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]