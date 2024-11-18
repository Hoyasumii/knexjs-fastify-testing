import app from "./app";

app.listen({ port: parseInt(process.env.PORT) }, (err, address) => {
  if (err) throw err;

  address = address.replace(/\[::1]/, "localhost");

  console.log(`🔥 Server is running at ${address}`);
});
