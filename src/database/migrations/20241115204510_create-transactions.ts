import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("transactions", (table) => {
    table.uuid("id", { primaryKey: true }).defaultTo(knex.fn.uuid());
    table.uuid("session_id").index("session");
    table.string("title").notNullable();
    table.double("amount").notNullable();
    table.enum("type", ["credit", "debit"]).defaultTo("credit");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("transactions");
}
