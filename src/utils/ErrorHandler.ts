import colors from 'colors/safe';

export const ErrorHandler = (status: string, statusCode: number, error: any): Error => {
    const toString = colors.green(colors.bold(`{ status: ${status}, statusCode: ${statusCode}, error: ${JSON.stringify(error)}`));
    return new Error(toString);
  };