import { app } from "./app";
import ConnectPostgres from "./database";
import getConfig from "./utils/config";
import { logInit, logger } from "./utils/logger";

export async function run() {
  try {
    const config = getConfig(process.env.NODE_ENV);

    // Debugging: Log config to ensure it's correctly loaded
    // console.log("Loaded config:", config);

    // Initialize Logger
    logInit({ env: config.env, logLevel: config.logLevel });

    // Debugging: Log to ensure logger initialized
    logger.info("Logger initialized");

    // Initialize Database
    const postgres = ConnectPostgres.getInstance();
    await postgres.connect({ url: config.postgresUrl as string });

    // Debugging: Log success message for database connection
    logger.info("Database connected successfully");

    // Start Server
    const server = app.listen(config.port, () => {
      logger.info(`Server is listening on port: ${config.port}`);
    });

    // Debugging: Log server start message
    logger.info("Server started");

    // Graceful Shutdown Handling
    const exitHandler = async () => {
      if (server) {
        server.close(async () => {
          logger.info("Server closed");
          await postgres.disconnect();
          logger.info("Postgres disconnected");
          process.exit(1); // Adjust exit code based on requirement
        });
      } else {
        await postgres.disconnect();
        logger.info("Postgres disconnected");
        process.exit(1); // Adjust exit code based on requirement
      }
    };

    // Error Handling
    const unexpectedErrorHandler = (error: unknown) => {
      logger.error("Unhandled error", { error });
      exitHandler();
    };

    process.on("uncaughtException", unexpectedErrorHandler);
    process.on("unhandledRejection", unexpectedErrorHandler);

    // SIGTERM Signal Handling
    process.on("SIGTERM", () => {
      logger.info("SIGTERM received");
      if (server) {
        server.close();
      }
    });
  } catch (error) {
    logger.error("Failed to initialize application", { error });
    process.exit(1); // Adjust exit code based on requirement
  }
}

run();
