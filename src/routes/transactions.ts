import { FastifyInstance } from "fastify";
import knex from "@/database";
import { z } from "zod";

export default async function (app: FastifyInstance) {
  app.get("/", async () => {
    return await knex("transactions").select();
  });

  app.get("/:id", async (request, reply) => {
    const getTransactionIdParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const getTransactionIdParamsSchemaParsed =
      getTransactionIdParamsSchema.safeParse(request.params);

    if (!getTransactionIdParamsSchemaParsed.success) {
      return reply.status(400).send({
        message: `🚫 Bad Request at ${request.url}(${request.method})`,
        cause: getTransactionIdParamsSchemaParsed.error.issues,
      });
    }

    const { id } = request.params as { id: string };

    const transaction = await knex("transactions").where("id", id).first().select("title", "type", "amount");

    if (!transaction) {
      return reply.status(404).send({
        message: `⛔ Not Found at ${request.url}(${request.method})`,
        cause: `Transaction not found ${id}`,
      });
    }

    return reply.status(200).send(transaction);
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

    const transactionId = await knex("transactions")
      .insert({
        title,
        amount: type === "credit" ? amount : -amount,
        type,
      })
      .returning("id");
    
      console.log(transactionId)

    return reply
      .status(201)
      .send(`✅ Transaction was been sucessful: ${transactionId[0].id}`);
  });
}
