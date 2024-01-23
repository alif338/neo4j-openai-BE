import { Request, Response } from "express";
import { validationResult } from "express-validator";
import wrapper from "../../helpers/utils/wrapper";
import Example from "./example_services";
import DB from "../../helpers/databases/graph_db/db";
import { Browse } from "./model";
const db = new DB();
const domain = new Example(db);

const index = (req: Request, res: Response) => {
  console.log(req.baseUrl);

  return res.status(200).json({ err: null, data: "hello world" });
};

const create = async (req: Request, res: Response) => {
  const err = validationResult(req);
  if (err.array().length > 0) {
    return wrapper.response(res, 400, false, "invalid payload", err.array());
  }

  const sendResponse = await domain.create(req.body);
  if (sendResponse.err) {
    return wrapper.response(
      res,
      400,
      false,
      "error when create data",
      sendResponse.err
    );
  }

  return wrapper.response(
    res,
    201,
    true,
    "create data success",
    sendResponse.data
  );
};

const read = async (req: Request, res: Response) => {
  const err = validationResult(req);
  if (err.array().length > 0) {
    return wrapper.response(res, 400, false, "invalid payload", err.array());
  }

  const sendResponse = await domain.read(req.query as unknown as Browse);

  if (sendResponse.err) {
    return wrapper.response(
      res,
      400,
      false,
      "error when create data",
      sendResponse.err
    );
  }

  return wrapper.response(
    res,
    201,
    true,
    "read data success",
    sendResponse.data
  );
};

const generateCompletion = async (req: Request, res: Response) => {

  const sendResponse = await domain.generateCompletion(req.body.prompts);

  if (sendResponse.err) {
    return wrapper.response(
      res,
      400,
      false,
      "error when generate prompts",
      sendResponse.err
    );
  }

  return wrapper.response(
    res,
    201,
    true,
    "read data success",
    sendResponse.data
  );
}

export default {
  index,
  create,
  read,
  generateCompletion
};
