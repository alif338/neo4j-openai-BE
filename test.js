import { auth, driver } from "neo4j-driver";

const uri = "neo4j://localhost:7687"; // replace with your Neo4j server URI
const user = "neo4j";
const password = "test123456";

const dr = driver(uri, auth.basic(user, password));
const session = dr.session();

const createNodeQuery = "CREATE (n:Person {name: $name, age: $age}) RETURN n";
const createRelationshipQuery = `
  MATCH (a:Person), (b:Person) 
  WHERE 
    a.name = $name1 
    AND b.name = $name2 
  CREATE (a)-[r:KNOWS]->(b) 
  RETURN r`;

async function exec() {
  try {
    const result = await session.run(createNodeQuery, {
      name: "john doe",
      age: 30,
    });
    console.log(result.records[0].get('n'));

    await session.run(createNodeQuery, {
      name: "james smith",
      age: 30,
    });

    const result2 = await session.run(createRelationshipQuery, {
      name1: "john doe",
      name2: "james smith"
    });
    console.log(result2.records);

    return;
  } catch (error) {
    console.error(error);
  } finally {
    session.close();
    return;
  }
}

exec();
