import { Model } from "sequelize/dist";
import { UpdateProductDTO } from "../dtos/UpdateProduct.dto";
import { ProductEntity } from "../entities/Product.entity";
import { ProductInterface } from "../interfaces/Product.interface";

export const UpdateProduct = async (payload: UpdateProductDTO): Promise<any> =>
// : Promise<Model<ProductInterface> | string>  => 
{
  const { UniqueCode } = payload;

  const uniqueCodeExists: Model<ProductInterface> | null = await ProductEntity.findOne({ where: { UniqueCode } })
  
  // if (emailExists) {
  //   return `The E-Mail '${Email}' is not available.`
  // } 
  // else if (!cpfExists) {
  //   return `There are no Cpf '${Cpf}' associated to an User in our database.`
  // };
  
  // delete payload.Cpf;

  // if (Password){
  //   const newPassword = await Bcrypt.encrypt(Password);
  //   payload.Password = newPassword;
  // }

  // const [ didUpdate ] = await UserEntity.update(payload, { where: { Cpf }, limit: 1 });

  // if (!didUpdate){
  //   return "User can't be updated";
  // }

  // const updatedUser: Model<UserInterface> = (await UserEntity.findOne({ where: { Cpf } })) as Model<UserInterface>;

  // return updatedUser;
};
