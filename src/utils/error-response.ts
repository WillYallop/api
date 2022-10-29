import { Response } from "express";

const errorResponse = (res: Response, data: ErrorResponse) => {
  return res.status(data.code).json(data);
};
export default errorResponse;
