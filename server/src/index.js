import "dotenv/config";
import express from "express";
import connectMongoDB from "./config/db.config.js";

export const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: false }));

// Database connection and server start
connectMongoDB()
  .then(() => {
    app.listen(port, () =>
      console.log("Server startedL:/\nhttp://localhost:" + port)
    );
  })
  .catch((error) => {
    console.error("Mongodb Error:", error);
    process.exit(1);
  });
