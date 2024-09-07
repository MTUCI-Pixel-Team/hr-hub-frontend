// import * as Sentry from '@sentry/react'
import ReactDOM from 'react-dom/client'
import { Providers } from './app/Providers'
import './app/global.css'

// Sentry.init({
//     dsn: 'https://554d85dfe52b0b6d10ca05274d0c209a@o4507577960038400.ingest.de.sentry.io/4507577962790992',
//     integrations: [
//         Sentry.browserTracingIntegration(),
//         Sentry.replayIntegration(),
//     ],
//     // Performance Monitoring
//     tracesSampleRate: 1.0, //  Capture 100% of the transactions
//     // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
//     tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
//     // Session Replay
//     replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
//     replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// })

ReactDOM.createRoot(document.getElementById('root')!).render(<Providers />)
