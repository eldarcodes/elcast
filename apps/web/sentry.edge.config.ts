import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://9934dcf872586259ba21c96769aa28cb@o599309.ingest.us.sentry.io/4509167968518144',

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
