import { Router } from "express";
import validateBodyMiddleware from "../middlewares/validateBody.middleware";
import {
  createMovieController,
  deleteMovieController,
  getMoviesController,
  updateMovieController,
} from "../controllers/movie.controllers";
import checkIfMovieExistMiddleware from "../middlewares/checkIfMovieExist.middleware";
import {
  movieSchemaRequest,
  movieSchemaUpdate,
} from "../schemas/movie.schemas";
import checkIfNameExistMiddleware from "../middlewares/checkIfNameExist.middleware";

const moviesRouters: Router = Router();

moviesRouters.post(
  "",
  checkIfNameExistMiddleware,
  validateBodyMiddleware(movieSchemaRequest),
  createMovieController
);

moviesRouters.get("", getMoviesController);

moviesRouters.patch(
  "/:id",
  checkIfMovieExistMiddleware,
  checkIfNameExistMiddleware,
  validateBodyMiddleware(movieSchemaUpdate),
  updateMovieController
);

moviesRouters.delete(
  "/:id",
  checkIfMovieExistMiddleware,
  deleteMovieController
);

export default moviesRouters;
