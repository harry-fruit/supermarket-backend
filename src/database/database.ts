import { Sequelize } from 'sequelize';
import { config as LoadEnvironmentVariables } from 'dotenv';

LoadEnvironmentVariables();

export const DbInstance = new Sequelize(
    process.env.DB_NAME || 'supermarket',
    process.env.DB_USER ||'root', 
    process.env.DB_PWD || 'rootroot', 
    {
      dialect: 'mariadb',
    },
  );

export const DatabaseConnection = async (): Promise<void> => {
    try {
        await DbInstance.authenticate()
            .then( () => console.log('Database authenticate sucessful') );
        await DbInstance.sync()
            .then( () => console.log('Database sync sucessful') );
    } catch(error: any) {
        throw new Error(error);
    }
};
