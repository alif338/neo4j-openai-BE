import express, { Request, Response } from "express";
import router from "./app/routes";
import neo4jClient from "./helpers/databases/graph_db/connection";
import openaiClient from "./helpers/utils/openai_helper";
import config from "./configs/global_config";
import cors from "cors";

const app = express();
const port = config.get("/port") || 3000;

app.use(express.json());
app.use(cors())
app.use("/api/v1", router);

neo4jClient.initializeDriver();
openaiClient.initializeClient();

app.get("/", (req: Request, res: Response) => {
  res.json({ success: true, message: "this message was run successfully" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
