import { Model } from "sequelize/dist";
import { OrderInterface } from "../interfaces/Order.interface";

// export const CreateOrder = async (payload: OrderInterface): Promise<Model<OrderInterface> | string> => {
//     // try {
//     //   const { password, cpf, email } = payload;
  
//     //   const emailExists: Model<UserInterface> | null = await UserEntity.findOne({ where: { email } })
//     //   const cpfExists  : Model<UserInterface> | null = await UserEntity.findOne({ where: { cpf } })
  
//     //   if (emailExists) {
//     //     return `The E-Mail '${email}' is not available.`
//     //   } 
//     //   else if (cpfExists) {
//     //     return `The CPF '${cpf}' is not available.`
//     //   };
      
//     //   const hashedPassword = await Bcrypt.encrypt(password);
//     //   payload.password = hashedPassword;
    
//     //   const result: Model<UserInterface> = await UserEntity.create({ ...payload });
//     //   return result;
      
//     // } 
//     // catch (error) {
//     //   throw error;
//     // };
//   };
  