import { Sequelize } from 'sequelize';
import { DataType } from 'sequelize-typescript';

const sequelize: Sequelize = new Sequelize();

const User = sequelize.define('User', {
    id: {
        type: DataType.STRING,
        allowNull: false,
    },
    name: {
        type: DataType.STRING,
        allowNull: false,
    },
    age: {
        type: DataType.NUMBER,
        allowNull: false
    }
})



// name: string,
// age: number,
// address: string,
// rg: string;
// phone: string,
// email: string,
// login: string,
// password: string,