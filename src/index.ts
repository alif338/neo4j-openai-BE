import express, { Request, Response } from "express";
import router from "./app/routes";
import neo4jClient from "./helpers/databases/graph_db/connection";
import config from "./configs/global_config";

const app = express();
const port = config.get("/port") || 3000;

app.use(express.json());
app.use("/api/v1", router);

neo4jClient.initializeDriver();

app.get("/", (req: Request, res: Response) => {
  res.json({ success: true, message: "this message was run successfully" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
