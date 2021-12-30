import mongoose from 'mongoose';

export const DatabaseConnection = async () => {
    await mongoose.connect('mongodb://isaque:rootroot@localhost:27017/supermarket')
        .then(() => console.log('MongoDB is connected.'))
        .catch((e) => { throw new Error(e) })
}
