import mongoose, { Model, model, Mongoose, Schema } from 'mongoose'
import { UsersInterface } from '../interfaces/usersInterface.interface';

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

export const usersModel:Model<UsersInterface> = model('Users', usersSchema, 'users');