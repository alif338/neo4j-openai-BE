import { Router } from "express";
import exampleHandler from "../modules/example/api_handler";
import exampleValidator from "../modules/example/validator";

const router = Router();

router.get("/", exampleHandler.index);
router.post("/create", exampleValidator.create, exampleHandler.create);
router.get("/read", exampleValidator.read, exampleHandler.read);

export default router;
