import config from 'config';
import context from './middleware/context';
import express from 'express';
import gracefulShutdown from '@nc/utils/graceful-shutdown';
import helmet from 'helmet';
import Logger from '@nc/utils/logging';
import security from './middleware/security';
import { router as userRoutes } from '@nc/domain-user';
import { createServer as createHTTPServer, Server } from 'http';
import {
  createServer as createHTTPSServer,
  Server as SecureServer,
} from 'https';

const logger = Logger('server');
const app = express();
const server: Server | SecureServer =
  config.https.enabled === true
    ? createHTTPSServer(config.https, app as any)
    : createHTTPServer(app as any);
let ready = false;

gracefulShutdown(server);
app.use(express.json());
app.use(helmet());
app.get('/readycheck', function readinessEndpoint(req, res) {
  const status = ready ? 200 : 503;
  res.status(status).send(status === 200 ? 'OK' : 'NOT OK');
});

app.get('/healthcheck', function healthcheckEndpoint(req, res) {
  res.status(200).send('OK');
});

app.use(context);
app.use(security);

app.use('/users', userRoutes);

app.use(function(req, res) {
  res.status(404).json({ error: 'No route' });
});

server.listen(config.port, () => {
  ready = true;
  logger.log(`Server started on port ${config.port}`);
});

export default server;
