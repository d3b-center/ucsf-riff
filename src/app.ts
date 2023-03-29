import cors from 'cors';
import express, { Express } from 'express';
import { Keycloak } from 'keycloak-connect';

import { globalErrorHandler, globalErrorLogger } from './errors';
import publicRouter from './routes/public';
import riffRouter from './routes/riff';

export default (keycloak: Keycloak): Express => {
    const app = express();

    app.use(cors());
    app.use(express.json({ limit: '50mb' }));

    app.use(
        keycloak.middleware({
            logout: '/logout',
            admin: '/',
        }),
    );

    app.use('/v2', publicRouter);
    app.use('/riff', keycloak.protect(), riffRouter);

    app.use(globalErrorLogger, globalErrorHandler);

    return app;
};
