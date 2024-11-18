import { execSync } from "node:child_process";
import { rmSync } from "node:fs";
import {
  expect,
  beforeAll,
  afterAll,
  describe,
  it,
  beforeEach,
  afterEach,
} from "vitest";
import request from "supertest";
import app from "@/app";

beforeAll(async () => {
  execSync("pnpm knex:test migrate:latest");

  await app.ready();
});

beforeEach(() => {
  execSync("pnpm knex:test migrate:latest");
});

afterEach(() => {
  execSync("pnpm knex:test migrate:rollback --all");
});

afterAll(async () => {
  rmSync(`${process.env.DB_PATH}/content.test.db`);
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
