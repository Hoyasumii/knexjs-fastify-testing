import { test, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "@/app";
import { loadEnv } from "@/utils";

beforeAll(async () => {
  loadEnv();
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

test("Should create a new transactions", async () => {
  const response = await request(app.server).post("/transactions").send({
    title: "Teste Aleatório do Supertest",
    amount: 1000.3,
    type: "credit",
  });

  expect(response.status === 201);
});
