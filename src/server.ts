import fastify from "fastify";
import { faker } from "@faker-js/faker";
import cookie from "@fastify/cookie";
import knex from "./database";
import logger from "./logger";
import { transactions } from "./routes";

const app = fastify({ logger });

app.register(cookie, {
  secret: process.env.COOKIES_SECRET,
});

app.get("/", async (_, reply) => {
  reply.status(200);
  return await knex("users")
    .insert({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      birth_date: faker.date.past(),
    })
    .returning("*");
});

app.register(transactions, { prefix: "transactions" });

app.listen({ port: parseInt(process.env.PORT) }, (err, address) => {
  if (err) throw err;

  address = address.replace(/\[::1]/, "localhost");

  console.log(`🔥 Server is running at ${address}`);
});
