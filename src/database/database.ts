import { Sequelize } from 'sequelize';
import { config as LoadEnvironmentVariables } from 'dotenv';

LoadEnvironmentVariables();

export const DbInstance = new Sequelize(
    process.env.DB_NAME || '',
    process.env.DB_USER || '', 
    process.env.DB_PWD, 
    {
      dialect: 'mariadb',
    },
  );

export const DatabaseConnection = async (): Promise<void> => {
    try {
        await DbInstance.authenticate()
            .then( () => console.log('Database authenticate sucessful') );
            
        //Remove when using in production
        await DbInstance.sync()
            .then( () => console.log('Database sync sucessful') );
    } catch(error: any) {
        throw new Error(error);
    }
};
