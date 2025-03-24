<p align="center">
  <a href="https://elcast.eldarcodes.com"><img width="300" src="https://i.imgur.com/W5ojt25.jpeg"></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" />
  <a href="https://github.com/eldarcodes/elcast/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="GitHub license" /></a>
</p>

# Elcast

Elcast is a dynamic livestreaming platform where users can discover and engage with content across gaming, entertainment, sports, music, and more. With a diverse range of channels and interactive experiences, Elcast offers something for every viewer and creator.

## 🚀 Features

- 🔐 **Authentication & Authorization** – Users can sign up, log in, and manage their accounts.  
- ✉️ **Mails** – Users can verify their email and receive mails for authentication, TOTP, and other security actions.  
- 🔑 **Password Recovery** – Easily reset passwords via email.  
- 🚫 **Account Deactivation** – Users can deactivate their accounts if needed.  
- 🤖 **Telegram Integration** – Users can connect their Telegram account to the _Elcast Bot_ to receive security notifications alongside email alerts.  
- 🎥 **Live Streaming** – Start and watch live streams in real time.  
- 💬 **Chat System** – Integrated live chat for viewers and streamers.  
- 📺 **Channel Management** – Users can customize their streaming channels.  
- ⭐ **Follow System** – Follow favorite streamers and get notified about their streams.  
- 🔔 **Notifications** – Users can receive different live notifications.  
- 🔐 **TOTP Authentication** – Additional security with Time-based One-Time Password (TOTP) authentication.  
- 🖥️ **Session Management** – Users can view all active sessions, see their locations (based on IP), and terminate them if needed.  
- 🔍 **Stream Categories & Tags** – Easily discover content by browsing different categories.  
- 🌍 **i18n Support** – Available in **Russian** and **English** for a localized experience.  
- 🌙 **Dark Mode** – Seamless UI experience with light/dark mode toggle.  

## Structure

| Codebase              |      Description          |
| :-------------------- | :-----------------------: |
| [Server](apps/api)    |     NestJS GraphQL API    |
| [Client](apps/web)    |     NextJS Client         |

## Branches

- `main` - The primary development branch. All new features, bug fixes, and improvements are merged here after code review and testing. This branch should always be in a deployable state.
- `production` - The stable branch that reflects the live/production environment. Only thoroughly tested and approved changes from main are merged here before deployment.

## Tech Stack

**Server**: A backend service built with NestJS, utilizing GraphQL, Prisma, Redis, and other essential technologies.

**Client**: A frontend web application developed using Next.js, React, Apollo Client, and Tailwind CSS.

*Package manager*: `pnpm`

### Server (Backend)

- **Framework**: NestJS
- **Language**: TypeScript
- **Database ORM**: Prisma
- **Database**: PostgreSQL
- **GraphQL Server**: Apollo Server with NestJS
- **Session Management**: Redis
- **File Storage**: AWS S3
- **Email Service**: Nodemailer

**Scripts**

- `start` - Start the production server
- `start:dev` - Start the development server with hot reload
- `db:push` - Push database schema changes
- `db:seed` - Seed the database
- `db:studio` - Open Prisma Studio for database management
- `lint`, `format` - Code quality and formatting scripts

### Client (Frontend)

- **Framework**: Next.js
- **Language**: TypeScript
- **State Management**: Zustand
- **GraphQL Client**: Apollo Client
- **Styling**: shadcn/ui, Tailwind CSS
- **Forms & Validation**: React Hook Form, Zod
- **Realtime**: LiveKit for interactive streaming
- **Internationalization**: `next-intl`

**Scripts**

- `dev` - Start the development server
- `build` - Build for production
- `start` - Start the production server
- `codegen` - Generate GraphQL types
- `lint`, `format` - Code quality and formatting scripts

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Server

#### General Configuration

- `NODE_ENV` – Defines the environment (development or production).
- `APPLICATION_PORT` – Port on which the backend server runs.
- `APPLICATION_URL` – Base URL of the backend.
- `ALLOWED_ORIGIN` – Defines allowed origin for CORS.
- `GRAPHQL_PREFIX` – API prefix for GraphQL endpoints.

#### Session & Authentication

- `COOKIES_SECRET` – Secret for encrypting cookies.
- `SESSION_SECRET` – Secret for signing sessions.
- `SESSION_NAME` – Name of the session cookie.
- `SESSION_DOMAIN` – Domain where session cookies are valid.
- `SESSION_MAX_AGE` – Session expiration time.
- `SESSION_HTTP_ONLY` – Whether the session cookie is HTTP-only.
- `SESSION_SECURE` – Whether the session cookie requires HTTPS.
- `SESSION_FOLDER` – Directory for storing session files in Redis.

#### Database

- `POSTGRES_URI` – Connection string for PostgreSQL.
- `REDIS_URI` – Connection string for Redis.

#### Email Configuration

- `MAIL_HOST` – Mail server host.
- `MAIL_PORT` – Mail server port.
- `MAIL_LOGIN` – Mail server login.
- `MAIL_PASSWORD` – Mail server password.

#### S3 Storage

- `S3_ENDPOINT` – URL for the S3 storage provider.
- `S3_REGION` – AWS region for S3.
- `S3_ACCESS_KEY_ID` – Access key ID for S3.
- `S3_SECRET_ACCESS_KEY` – Secret access key for S3.
- `S3_BUCKET_NAME` – Name of the S3 bucket.

#### LiveKit

- `LIVEKIT_API_URL` – API endpoint for LiveKit.
- `LIVEKIT_API_KEY` – API key for LiveKit.
- `LIVEKIT_API_SECRET` – API secret for LiveKit.

#### Telegram

- `TELEGRAM_BOT_TOKEN` – API token for the Telegram bot.

### Client

- `NEXT_PUBLIC_SERVER_URL` – URL for the GraphQL API.
- `NEXT_PUBLIC_MEDIA_URL` – URL for accessing media files. (S3 Storage)
- `NEXT_PUBLIC_TELEGRAM_BOT_URL` – Telegram bot link for Elcast.
- `NEXT_PUBLIC_LIVEKIT_WS_URL` – WebSocket URL for LiveKit.
- `NEXT_PUBLIC_WEBSOCKET_URL` – WebSocket URL for GraphQL subscriptions.
- `NEXT_PUBLIC_APP_URL` – Base URL of the frontend application.

## Run Locally

Clone the project

```bash
  git clone https://github.com/eldarcodes/elcast.git

  cd elcast
```

### Setup server

- Go to the project directory

```bash
  cd apps/api
```

- Install dependencies

```bash
  pnpm install
```

- Create an environment file

```bash
  cp .env.example .env
```

- Start PostgreSQL and Redis using Docker

```bash
  docker-compose up -d
```

- Run Prisma migrations (apply database schema changes):

```bash
  pnpm prisma migrate dev
```

- Seed database if needed

```bash
  pnpm run db:seed
```

- Start the API in development mode

```bash
  pnpm run start:dev
```

### Setup client

- Go to the project directory

```bash
  cd apps/web
```

- Install dependencies

```bash
  pnpm install
```

- Create an environment file

```bash
  cp .env.example .env
```

- Start client in development mode

```bash
  pnpm run dev
```

## Contributing

Contributions are always welcome!

Elcast is open to contributions, but I recommend creating an issue or leaving a comment to share what you're working on first to avoid conflicts.

## Authors

- [@eldarcodes](https://www.github.com/eldarcodes)

## License

[MIT](https://github.com/eldarcodes/elcast/blob/main/LICENSE)
