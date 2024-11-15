import fastify from "fastify";

const app = fastify();

app.get("/", async (request, reply) => {
  reply.status(200);
  return "Hello World";
});

app.listen({ port: parseInt(process.env.PORT) }, (err, address) => {
  if (err) throw err;

  address = address.replace(/\[::1]/, "localhost");

  console.log(`Server is running at: ${address}`);
});
