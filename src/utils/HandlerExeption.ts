import colors from 'colors/safe'
//TODO: REFAZER
export const HandlerExeption = (
    status: string,
    statusCode: number,
    message: {}
  ): void => {
    const dataToJSON: string = (JSON.stringify({ status, statusCode, message }));
    const result = `${colors.red('ERROR: ')} ${colors.blue(dataToJSON)}`
    console.log(result)
  };