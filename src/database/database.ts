import { Sequelize } from 'sequelize';
import { HttpHandlerExeption } from '../utils/HttpHandlerExeption';

export const DatabaseConnection = async (): Promise<void> => {
    try {
        const sequelize: Sequelize = new Sequelize('supermarket','root','rootroot', {
            host: 'localhost',
            dialect: 'mariadb',
        });
        await sequelize.authenticate();
        await sequelize.sync()
            .then(msg => console.log('everything went right'))
    } catch(error: any) {
        throw new HttpHandlerExeption('Internal Server Error', 500, error);
    }
}
