import { int } from "neo4j-driver";
import DB from "../../helpers/databases/graph_db/db";
import wrapper from "../../helpers/utils/wrapper";

class Query {
  protected db: DB;
  constructor(db: DB) {
    this.db = db;
  }

  async read(search: string = "", limit: number, offset: number) {
    const cql = `
        MATCH (p:Person)
        WHERE p.name CONTAINS $search
        return p.name, p.age
        skip $offset
        limit $limit;
    `;

    const params = { search, limit: int(limit), offset: int(offset) };
    try {
      const result = await this.db.execute(cql, params);
      return wrapper.data(result.records);
    } catch (error) {
      console.error(error);
      return wrapper.error(error);
    }
  }
}

export default Query;
