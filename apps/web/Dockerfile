FROM node:20.17.0-alpine AS base

RUN npm i -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

ENV NODE_ENV=production

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "start"]