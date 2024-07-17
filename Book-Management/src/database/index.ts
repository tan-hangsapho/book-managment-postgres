import { Sequelize } from "sequelize";
import { logger } from "../utils/logger";

export default class ConnectPostgres {
  private static instance: ConnectPostgres;
  private sequelize!: Sequelize;

  private constructor() {}

  public static getInstance(): ConnectPostgres {
    if (!ConnectPostgres.instance) {
      ConnectPostgres.instance = new ConnectPostgres();
    }
    return ConnectPostgres.instance;
  }

  public static resetInstance(): void {
    ConnectPostgres.instance = new ConnectPostgres();
  }

  public async connect({ url }: { url: string }): Promise<void> {
    this.sequelize = new Sequelize(url, {
      dialect: "postgres",
      logging: false, // Set to true if you want to see SQL queries in the console
    });

    try {
      await this.sequelize.authenticate();
      logger.info("Successfully connected to Postgres");

      // Sync all models
      await this.sequelize.sync();
      logger.info("All models were synchronized successfully.");
    } catch (error) {
      logger.error("Initial Postgres connection error", { error });
      throw error; // Rethrow the error to handle it in the caller function
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this.sequelize.close();
      logger.info("Postgres disconnected");
    } catch (error) {
      logger.error("Error during Postgres disconnection", { error });
    }
  }
}
