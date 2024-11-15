import fastify from "fastify";
import knex from "./database";

const app = fastify();

app.get("/", async (request, reply) => {
  reply.status(200);
  return await knex("sqlite_schema").select("*");
});

app.listen({ port: parseInt(process.env.PORT) }, (err, address) => {
  if (err) throw err;

  address = address.replace(/\[::1]/, "localhost");

  console.log(`Server is running at ${address}`);
});
