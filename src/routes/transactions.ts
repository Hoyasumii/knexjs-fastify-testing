import { FastifyInstance } from "fastify";

export default async function (app: FastifyInstance) {
  app.get("/", (_, reply) => {
    return reply.status(200).send("ok");
  });
}
