import { CreateUserInterface } from "../interfaces/createUser.interface";
import { usersCollection, usersModel } from "../models/usersModel";

export const createUser = async (payload: CreateUserInterface) => {
    const result = (await usersCollection).insertOne({ ...payload });
    console.log(result);
    return;
}