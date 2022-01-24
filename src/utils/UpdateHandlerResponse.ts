import { Model } from "sequelize";

 export type UpdateHandlerResponseType = {
    didUpdate: boolean,
    message: {}
 };

 export type UpdateHandlerParamsType = [
    statusCode: number,
    model: Model<any>[],
 ];

 export const UpdateHandlerResponse = (updateParams: UpdateHandlerParamsType): UpdateHandlerResponseType => {
    const [ statusCode, model ] = updateParams;
    return { didUpdate: !statusCode, message: { ...model } }
 };