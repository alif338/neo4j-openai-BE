import { Response } from "express";

export interface Wrapper {
  data: any;
  err: any;
}

const response = (
  response: Response,
  code: number,
  success: boolean,
  message: string,
  data: any
) => {
  return response.status(code).json({
    code,
    success,
    message,
    data,
  });
};

const data = (payload: any) => {
  return { err: null, data: payload } as Wrapper;
};

const error = (message: any) => {
  return { err: message, data: null } as Wrapper;
};

export default {
  response,
  data,
  error,
};
