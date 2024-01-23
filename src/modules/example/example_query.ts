import { int } from "neo4j-driver";
import DB from "../../helpers/databases/graph_db/db";
import wrapper from "../../helpers/utils/wrapper";

class Query {
  protected db: DB;
  constructor(db: DB) {
    this.db = db;
  }

  async read() {
    const cql = `
        Match (p) return p;
    `;

    try {
      const result = await this.db.execute(cql);
      return wrapper.data(result.records);
    } catch (error) {
      return wrapper.error(error);
    }
  }

  async readRelationships() {
    const cql = `
      match ()-[r]->() return r
    `;

    try {
      const result = await this.db.execute(cql);
      return wrapper.data(result.records);
    } catch (error) {
      return wrapper.error(error);
    }
  }
}

export default Query;
