import express, { Express } from "express";
import cors from "cors";
import index from "./routes/index.routes";
import nouns from "./routes/nouns.routes";
import dotenv from "dotenv";

dotenv.config();
const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "100mb" }));
app.use(
  cors({
    origin: process.env.BASE_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
  })
);
app.use("/", index);
app.use("/api", nouns);

const port = process.env.PORT ?? 5000;
app.listen(port, () => {
  console.log(`Server is connected on ${port}`);
});
