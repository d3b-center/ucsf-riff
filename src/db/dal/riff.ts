import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import RiffModel, { IRiffInput, IRiffOuput } from '../models/Riff';

const sanitizeInputPayload = (payload: IRiffInput) => {
    const { id, uid, creationDate, ...rest } = payload;
    return rest;
};

export const getRiffByUserIdAndSharedPublictly = async (keycloak_id: string): Promise<IRiffOuput[]> => {
    const riffs = await RiffModel.findAll({
        where: {
            uid: keycloak_id,
            sharedPublicly: false,
        },
    });

    return riffs.map((dbResp) => dbResp.dataValues).map((riff) => ({ ...riff, id: riff.id.toString(36) }));
};

export const getRiff = async (riff_id: string): Promise<IRiffOuput> => {
    const riff = await RiffModel.findOne({
        where: {
            id: parseInt(riff_id, 36),
        },
    });

    if (!riff) {
        throw createHttpError(StatusCodes.NOT_FOUND, `Riff with id ${riff_id} does not exist.`);
    }

    return { ...riff.dataValues, id: riff.dataValues.id.toString(36) };
};

export const createRiff = async (keycloak_id: string, payload: IRiffInput): Promise<IRiffOuput> => {
    const newRiff = await RiffModel.create({
        ...payload,
        uid: keycloak_id,
        creationDate: new Date(),
        updatedDate: new Date(),
    });
    return { ...newRiff.dataValues, id: newRiff.dataValues.id.toString(36) };
};

export const updateRiff = async (riff_id: string, keycloak_id: string, payload: IRiffInput): Promise<IRiffOuput> => {
    const results = await RiffModel.update(
        {
            ...sanitizeInputPayload(payload),
            updatedDate: new Date(),
        },
        {
            where: {
                id: parseInt(riff_id, 36),
                uid: keycloak_id,
            },
            returning: true,
        },
    );

    return { ...results[1][0].dataValues, id: results[1][0].dataValues.id.toString(36) };
};

export const deleteRiff = async (riff_id: string, keycloak_id: string): Promise<void> => {
    await RiffModel.destroy({
        where: {
            id: parseInt(riff_id, 36),
            uid: keycloak_id,
        },
    });
};
