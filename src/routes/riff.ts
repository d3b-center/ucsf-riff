import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { createRiff, deleteRiff, getRiff, getRiffByUserIdAndSharedPublictly, updateRiff } from '../db/dal/riff';

// Handles requests made to /users
const riffRouter = Router();

riffRouter.get('/user/:id?', async (req, res, next) => {
    try {
        const keycloak_id = req['kauth']?.grant?.access_token?.content?.sub;
        const requestKeycloakId = req.params.id;

        const result = await getRiffByUserIdAndSharedPublictly(requestKeycloakId ?? keycloak_id);
        res.status(StatusCodes.OK).send(result);
    } catch (e) {
        next(e);
    }
});

riffRouter.get('/:id?', async (req, res, next) => {
    try {
        const requestRiffId = req.params.id;

        const result = await getRiff(requestRiffId);
        res.status(StatusCodes.OK).send(result);
    } catch (e) {
        next(e);
    }
});

riffRouter.post('/shorten', async (req, res, next) => {
    try {
        const keycloak_id = req['kauth']?.grant?.access_token?.content?.sub;
        const result = await createRiff(keycloak_id, req.body);
        res.status(StatusCodes.OK).send(result);
    } catch (e) {
        next(e);
    }
});

riffRouter.put('/:id?', async (req, res, next) => {
    try {
        const keycloak_id = req['kauth']?.grant?.access_token?.content?.sub;
        const requestRiffId = req.params.id;
        const result = await updateRiff(requestRiffId, keycloak_id, req.body);
        res.status(StatusCodes.OK).send(result);
    } catch (e) {
        next(e);
    }
});

riffRouter.delete('/:id?', async (req, res, next) => {
    try {
        const keycloak_id = req['kauth']?.grant?.access_token?.content?.sub;
        const requestRiffId = req.params.id;
        await deleteRiff(requestRiffId, keycloak_id);
        res.status(StatusCodes.OK).send(true);
    } catch (e) {
        next(e);
    }
});

export default riffRouter;
