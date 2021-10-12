import express from "express";
import routes from "./routes/init";
import morgan from "morgan";
import cookieParser from 'cookie-parser'
import "colors";

import db from "./config/db";
import errorHandler from "./middlewares/error";

// Create server
const app = express();

// body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cookie
app.use(cookieParser())

// Connect to database
db.connect();

// Dev logging middleware
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

// Init routes: api/v1/
app.use("/api/v1", routes);

// Error handler
app.use(errorHandler);
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`.yellow.bold)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);

  // Close server & exit process
  server.close(() => process.exit(1));
});
