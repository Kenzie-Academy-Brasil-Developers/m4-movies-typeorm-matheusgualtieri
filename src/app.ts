import express, { Application, json } from "express";
import "reflect-metadata";
import "express-async-errors";
import { errorHandler } from "./error";
import moviesRouters from "./routes/movie.routes";

const app: Application = express();

app.use(json());

app.use("/movies", moviesRouters);

app.use(errorHandler);
export default app;
