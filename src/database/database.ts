import mongoose from 'mongoose';

export const DatabaseConnection = async () => {
    const conection = await mongoose.connect('mongodb://harry:rootroot@localhost:27017/supermarket', { autoCreate: true })
        .then(() => console.log('MongoDB is connected.'))
        .catch((e) => { throw new Error(e) })
}
