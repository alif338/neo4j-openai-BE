import { body, query } from "express-validator";

const create = [
  body("name").notEmpty().withMessage("name is required"),
  body("age").isNumeric().notEmpty().withMessage("age is required"),
];

const read = [
  query("search").default(""),
  query("limit").default(15),
  query("page").default(1),
];

export default {
  create,
  read
};
