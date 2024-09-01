FROM node:alpine AS development

# this will create a dictory
WORKDIR /usr/src/app

# this will copy package.json to /usr/src/app "./ (which is /usr/src/app/)"
COPY package.json ./

# this will copy package.json to /usr/src/app
COPY package-lock.json ./

#it will install packages
RUN npm install

# it will copy all the files into root of a docker container
COPY . .

RUN npm run build

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

# this will only install dependencies and ignore dev dependencies
RUN npm install --omit=dev

# this will copy from stage development which will contain dev dependencies and copy to our dist folder
COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/auth/main"]