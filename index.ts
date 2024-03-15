import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./router";
import middleware from "./src/utils/customError";

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb://localhost:27017/?readPreference=primary&appname=mongodb-vscode+1.3.1&ssl=false&directConnection=true&serverSelectionTimeoutMS=2000",
    {
      dbName: "Note_Book",
      serverSelectionTimeoutMS: 5000,
    }
  )
  .then(() => {
    console.log("db connected");
    const PORT = 3005;

    app.listen(PORT, () => {
      console.log("Server is listening on port: ", PORT);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api", routes);
app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);
