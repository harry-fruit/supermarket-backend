import { CreateUser } from "../interfaces/createUser.interface";
import { usersCollection, usersModel } from "../models/usersModel";

export const createUser = async () => {
    (await usersCollection).insertOne({name:"isaque", email:"isaque17@gmail.com"})
}