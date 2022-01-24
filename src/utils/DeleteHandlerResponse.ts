export type DeleteHandlerResponseType = {
  isDeleted: boolean;
  message: string;
};

export const DeleteHandlerResponse = (
  statusCode: number,
  message: string
): DeleteHandlerResponseType => {
  return { isDeleted: !statusCode, message };
};
