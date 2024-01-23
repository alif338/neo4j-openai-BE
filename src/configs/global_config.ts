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
  llm: {
    endpoint: process.env.OPENAI_ENDPOINT,
    apikey: process.env.OPENAI_API_KEY,
    deploymentName: process.env.OPENAI_DEPLOYMENT_NAME,
    apitype: process.env.OPENAI_API_TYPE
  }
};

const store = new confidence.Store(config);
const get = (key: string) => store.get(key);

export default { get };
