import { Request, Response } from "express";
// utils
import { queryBuilder } from "../../utils";

const getProjects = async (req: Request, res: Response) => {
  // get query string params from url
  const { page, filter, sort } = req.query;

  // @ts-ignore
  res.status(200).json({ query: queryBuilder({ filter, sort, page }) });
};
export default getProjects;
