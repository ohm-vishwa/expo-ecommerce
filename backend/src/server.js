import express from "express";
import path from "path";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";

const app = express();

const __dirname = path.resolve();

console.log(__dirname);

app.use(clerkMiddleware()); // adds auth object under the request req => req.auth

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Success" });
});

//make our app readyt for developemnt

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../admin/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
  });
}

app.listen(ENV.PORT, () => {
  console.log("✅ Server is up and running");
  connectDB();
});
