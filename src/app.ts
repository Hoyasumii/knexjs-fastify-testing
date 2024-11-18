import fastify from "fastify";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import { faker } from "@faker-js/faker";
import knex from "./database";
import logger from "./logger";
import { transactions } from "./routes";

const app = fastify({ logger });

app.register(cors, {
  credentials: true,
});

app.register(cookie, {
  secret: process.env.COOKIES_SECRET || "123",
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

export default app;
