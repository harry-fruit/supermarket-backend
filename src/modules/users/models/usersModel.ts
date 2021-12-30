import { model, Schema } from 'mongoose'

const usersSchema = new Schema({
    name: String,
    age: Number,
    address: String,
    phone: String,
    email: String,
    login: String,
    password: String,
    createdAt: Date,
    updatedAt: Date,
});

export const usersModel = model('Users', usersSchema);
export const usersCollection = usersModel.createCollection();