import { RecordShape, Result } from "neo4j-driver";
import conn from "./connection";

class DB {
  async execute(query: string, params: any): Promise<Result<RecordShape>> {
    try {
      const session = conn.getCurrentDriver().session();
      const result = await session.run(query, params);

      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default DB;
