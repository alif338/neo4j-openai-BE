import DB from "../../helpers/databases/graph_db/db";
import wrapper from "../../helpers/utils/wrapper";

class Command {
  protected db: DB;
  constructor(db: DB) {
    this.db = db;
  }

  async create(name: string, age: number) {
    const createNodeQuery =
      "CREATE (n:Person {name: $name, age: $age}) \n RETURN n";
    try {
      const result = await this.db.execute(createNodeQuery, { name, age });

      return wrapper.data(result);
    } catch (error) {
      return wrapper.error(error);
    }
  }

  async detach() {
    const query = `
      match (n) detach delete n;
    `;

    try {
      const result = await this.db.execute(query);
      return wrapper.data(result);
    } catch (error) {
      return wrapper.error(error);
    }
  }

  async generateGraph(query: string) {
    try {
      const result = await this.db.execute(query);
      return wrapper.data(result);
    } catch (error) {
      console.error(error);
      return wrapper.error(error);
    }
  }
}

export default Command;
