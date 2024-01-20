import DB from "../../helpers/databases/graph_db/db";
import wrapper from "../../helpers/utils/wrapper";
import Command from "./example_command";
import Query from "./example_query";
import { Browse, User } from "./model";

class Example {
  protected command: Command;
  protected query: Query;

  constructor(db: DB) {
    this.command = new Command(db);
    this.query = new Query(db);
  }

  async create(payload: User) {
    const result = await this.command.create(payload.name, payload.age);
    if (result.err) {
      return wrapper.error(result.err);
    }

    return wrapper.data(result.data);
  }

  async read(data: Browse) {
    const offset = (data.page - 1) * data.limit;

    const result = await this.query.read(data.search, data.limit, offset);
    if (result.err) {
      return wrapper.error(result.err)
    }

    return wrapper.data(result.data)
  }
}

export default Example;
