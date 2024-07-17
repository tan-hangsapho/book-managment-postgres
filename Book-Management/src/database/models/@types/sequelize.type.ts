import { Sequelize } from "sequelize";
import getConfig from "../../../utils/config";

const config = getConfig(process.env.NODE_ENV);
const postgresUrl = config.postgresUrl; // Ensure postgresUrl is defined
if (!postgresUrl) {
  throw new Error("Postgres URL is not defined in configuration.");
}

const sequelize = new Sequelize(postgresUrl, {
  dialect: "postgres",
  logging: false, // Set to true if you want to see SQL queries in the console
});

export default sequelize;
