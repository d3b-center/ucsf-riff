import { Router } from 'express';

import { version } from '../../package.json';
import { dbHost, dbName, keycloakURL } from '../env';

// Handles public endpoint requests
const publicRouter = Router();

publicRouter.get('/api-docs', (_req, res) =>
    res.send({
        version,
        keycloak: keycloakURL,
        databaseHost: dbHost,
        databaseName: dbName,
    }),
);

export default publicRouter;
