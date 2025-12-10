FROM node:20.17.0-alpine AS base

RUN npm i -g pnpm

WORKDIR /app

ARG NEXT_PUBLIC_SERVER_URL

ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "start"]