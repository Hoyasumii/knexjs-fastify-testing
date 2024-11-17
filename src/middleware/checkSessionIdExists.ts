import { FastifyReply, FastifyRequest } from "fastify";

export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const sessionId = request.cookies.sessionId;

  if (!sessionId) {
    return reply.status(404).send({
      message: `👻 Not Found at ${request.url}(${request.method})`,
      cause: "There is no sessionId",
    });
  }
}
