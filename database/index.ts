import knex from "knex";
import { config } from "./config";

export { config } from "./config";
export default knex(config);
