import "dotenv/config";
import express from "express";
import connectMongoDB from "./config/db.config.js";
import errorHandler from "./middlewares/errorHandler.js";

export const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: false }));

// Import routes
import userRoutes from "./routes/user.routes.js";
import thoughtsRoutes from "./routes/thoughts.routes.js";

// Router declaration
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/thoughts", thoughtsRoutes);
app.use(errorHandler);

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
