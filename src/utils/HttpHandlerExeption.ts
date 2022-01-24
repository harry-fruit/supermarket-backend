export const HttpHandlerResponse = (status: string, statusCode: number, message: {}) => {
    return {
        status,
        statusCode,
        message,
    };
};