import { FastifyInstance } from "fastify";
import knex from "@/database";
import { z } from "zod";

export default async function (app: FastifyInstance) {
  app.get("/", async () => {
    return await knex("transactions").select();
  });

  app.post("/", async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });

    const { amount, title, type } = request.body as z.infer<
      typeof createTransactionBodySchema
    >;

    const createTransactionBodySchemaParsed =
      createTransactionBodySchema.safeParse({ amount, title, type });

    if (!createTransactionBodySchemaParsed.success) {
      return reply.status(400).send({
        message: `🚫 Bad Request at ${request.url}(${request.method})`,
        cause: createTransactionBodySchemaParsed.error.issues,
      });
    }

    await knex("transactions").insert({
      title,
      amount: type === "credit" ? amount : -amount,
      type,
    });

    return reply.status(201).send("✅ Transaction was been sucessful");
  });
}
