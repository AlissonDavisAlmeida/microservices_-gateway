FROM node:21-alpine3.20 AS base

ENV  YARN_VERSION=4.1.1

RUN apk update && apk upgrade && apk add --no-cache libc6-compat && apk add dumb-init

RUN corepack enable && corepack prepare yarn@${YARN_VERSION}


FROM base AS builder

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY tsconfig.json .
COPY .yarnrc.yml .
COPY .yarn .
COPY src ./src

RUN yarn workspaces focus -A --production
RUN yarn install
RUN yarn build

FROM base AS runner

WORKDIR /app
RUN apk add --no-cache curl 
COPY package.json yarn.lock .yarnrc.yml ./
COPY tsconfig.json .
COPY .yarn .
COPY --from=builder /app/build ./build


RUN yarn workspaces focus -A --production
RUN yarn install

EXPOSE 4000

CMD ["yarn", "start"]