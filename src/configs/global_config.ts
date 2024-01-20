import dotenv from "dotenv";
import confidence from "confidence";

dotenv.config(); // Load environment variables from .env file

const config = {
  port: process.env.PORT,
  neo4j: {
    uri: process.env.NEO4J_URI,
    user: process.env.NEO4J_USER,
    password: process.env.NEO4J_PASSWORD,
  },
};

const store = new confidence.Store(config);
const get = (key: string) => store.get(key);

export default { get };
