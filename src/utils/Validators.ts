import Joi from 'joi';

const CpfSchema = Joi
    .string()
    .max(14)
    .pattern(/^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/);

export const IsValidCPF = (cpf: string): boolean => {

    const validateResult = CpfSchema.validate(cpf);
    const isValid = validateResult.error ? false : true;
    
    return isValid;
} 