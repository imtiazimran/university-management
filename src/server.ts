import app from "./app";
import mongoose from "mongoose";
import config from "./config";
import { Server } from "http"

let server: Server;


async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(` app listening on port ${config.port as unknown as number}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log(" Unhandled Rejection is detected sutting down.....")

  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})


process.on('uncaughtException', () => {
  console.log(" Unhandled Rejection is detected sutting down.....")
  process.exit(1)
})

