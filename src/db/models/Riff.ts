import { DataTypes, Model } from 'sequelize';

import sequelizeConnection from '../config';

interface IRiffAttributes {
    id: number;
    uid: string;
    content?: unknown;
    alias?: string;
    sharedPublicly: boolean;
    creationDate: Date;
    updatedDate: Date;
}

export type IRiffInput = IRiffAttributes;
export type IRiffOuput = {
    id: string;
    uid: string;
    content?: unknown;
    alias?: string;
    sharedPublicly: boolean;
    creationDate: Date;
    updatedDate: Date;
};

class RiffModel extends Model<IRiffAttributes, IRiffInput> implements IRiffAttributes {
    public id!: number;
    public uid!: string;
    public sharedPublicly!: boolean;
    public creationDate!: Date;
    public updatedDate!: Date;
}

RiffModel.init(
    {
        id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        uid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: {},
        },
        alias: DataTypes.STRING,
        sharedPublicly: {
            field: 'shared_publicly',
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        creationDate: {
            field: 'creation_date',
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },
        updatedDate: {
            field: 'updated_date',
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },
    },
    { sequelize: sequelizeConnection, modelName: 'riff', timestamps: false, tableName: 'riff' },
);

export default RiffModel;
