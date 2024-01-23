import DB from "../../helpers/databases/graph_db/db";
import wrapper, { Wrapper } from "../../helpers/utils/wrapper";
import Command from "./example_command";
import Query from "./example_query";
import { Browse, User } from "./model";
import openai_helper from "../../helpers/utils/openai_helper";
import { ChatRequestMessage, GetChatCompletionsOptions } from "@azure/openai";

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

    const result = await this.query.read();
    if (result.err) {
      return wrapper.error(result.err);
    }

    return wrapper.data(result.data);
  }

  async generateCompletion(prompts: string[]) {
    const detach = await this.command.detach();
    if (detach.err) {
      return wrapper.error("something went wrong, please try again");
    }

    const content = `
    Extract an ontology. Do not draw it but Create a Cypher query that contains nodes and relationships. Make the graph OPTIMIZED. 
    Each node has attributes: name, color (string). [These attributes will be used for visualization using Graphology JS)
    Use this text as a basis:

    ${prompts?.map((text) => text + "\n\n")}
    
    Give an output cipher query only. DON'T add ANY caption and MAKE SURE NO SYNTAX ERROR.
    `;

    const messages: ChatRequestMessage[] = [
      {
        role: "user",
        content,
        name: "user",
      },
    ];

    const result = await openai_helper.getChatCompletions(messages);
    if (!result) {
      return wrapper.error("something went wrong");
    }

    const responseMessage = result.choices[0].message;

    const create = await this.command.generateGraph(responseMessage?.content || "")
    if (create.err) {
      return wrapper.error("error when generate graph. try again")
    }

    const nodes = await this.query.read();
    if (nodes.err) {
      return wrapper.error("error when get nodes. try again")
    }

    const relationships = await this.query.readRelationships();
    if (relationships.err) {
      return wrapper.error("error when get relationships try again")
    }

    const response = {
      nodes: nodes.data,
      relationships: relationships.data
    }

    return wrapper.data(response);
  }
}

export default Example;
