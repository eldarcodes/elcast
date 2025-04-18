const Sentry = require('@sentry/nestjs');
const { nodeProfilingIntegration } = require('@sentry/profiling-node');

Sentry.init({
  dsn: 'https://5d7f9493a5fb23b1c7013d77bc90d7b0@o599309.ingest.us.sentry.io/4509168535928832',

  enabled: process.env.NODE_ENV === 'production',

  integrations: [
    // Add our Profiling integration
    nodeProfilingIntegration(),
  ],

  // Add Tracing by setting tracesSampleRate
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // Set sampling rate for profiling
  // This is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});
