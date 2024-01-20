import { Driver, auth, driver } from "neo4j-driver";
import config from "../../../configs/global_config";

let currentDriver: Driver;

const initializeDriver = () => {
  try {
    const uri: string = config.get("/neo4j/uri") || "";
    const user: string = config.get("/neo4j/user") || "";
    const password: string = config.get("/neo4j/password") || "";

    const dr = driver(uri, auth.basic(user, password));

    currentDriver = dr;

    console.log("*** neo4j initialized successfully ***");
  } catch (error) {
    console.error(error);
  }
};

const getCurrentDriver = () => {
  return currentDriver;
};

export default {
  initializeDriver,
  getCurrentDriver,
};
