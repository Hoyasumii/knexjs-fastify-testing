import { expect, beforeAll, afterAll, describe, it } from "vitest";
import request from "supertest";
import app from "@/app";

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

describe("Transactions Route", () => {
  it("Should create a new transaction", async () => {
    const response = await request(app.server).post("/transactions").send({
      title: "Teste Aleatório do Supertest",
      amount: 1000.3,
      type: "credit",
    });

    expect(response.status === 201);
  });

  it("Should list all transactions", async () => {
    let cookies: Array<string> = [];

    for (let index = 0; index < 5; index++) {
      if (index === 0) {
        const firstTransactionData = await request(app.server)
          .post("/transactions")
          .send({
            title: "Teste Aleatório do Supertest",
            amount: index,
            type: "credit",
          });

        cookies = firstTransactionData.get("Set-Cookie") ?? [];

        continue;
      }

      await request(app.server)
        .post("/transactions")
        .set("Cookie", cookies)
        .send({
          title: "Teste Aleatório do Supertest",
          amount: index,
          type: "credit",
        });
    }

    const allTransactionsResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies);

    expect((allTransactionsResponse.body as Array<unknown>).length === 5);
  });
});
