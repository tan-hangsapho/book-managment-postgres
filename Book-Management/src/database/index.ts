import { Sequelize } from "sequelize";
import { logger } from "../utils/logger";

export default class ConnectPostgres {
  private static instance: ConnectPostgres;
  private postgresUrl: string = "";
  private sequelize!: Sequelize;

  private constructor() {
    this.setupEventListeners();
  }

  public static getInstance(): ConnectPostgres {
    if (!ConnectPostgres.instance) {
      ConnectPostgres.instance = new ConnectPostgres();
    }

    return ConnectPostgres.instance;
  }

  public static resetInstance(): void {
    ConnectPostgres.instance = new ConnectPostgres();
  }

  private setupEventListeners(): void {
    this.sequelize = new Sequelize(this.postgresUrl);

    this.sequelize
      .authenticate()
      .then(() => {
        logger.info("Postgres connected");
      })
      .catch((error: Error) => {
        logger.error("Error in Postgres connection", { error });
      });

    this.sequelize.sync(); // This syncs all defined models to the DB schema
  }

  public async connect({ url }: { url: string }): Promise<void> {
    this.postgresUrl = url;
    try {
      await this.sequelize.authenticate();
      logger.info("Successfully connected to Postgres");
    } catch (err) {
      logger.error("Initial Postgres connection error", { err });
    }
  }

  public async disconnect(): Promise<void> {
    await this.sequelize.close();
    logger.info("Postgres disconnected");
  }
}
