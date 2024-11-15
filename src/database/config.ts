import { Knex } from "knex";

export const config: Knex.Config = {
  client: "sqlite",
  connection: {
    filename: `${process.env.DB_PATH}/content.db`,
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: `${process.env.DB_PATH}/migrations`,
  },
};
