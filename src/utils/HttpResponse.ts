export type HttpResponseType = {
  status: string;
  statusCode: number;
  message: {};
};

export const HttpResponse = (
  status: string,
  statusCode: number,
  message: {}
): HttpResponseType => {
  return { status, statusCode, message };
};
