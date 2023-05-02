import { Request, Response } from "express";
import { TMovie, TMovieRequest } from "../interfaces/movie.interfaces";
import createMovieService from "../services/createMovie.services";
import getMoviesService from "../services/getMovies.services";
import updateMovieService from "../services/updateMovie.services";
import deleteMovieService from "../services/deleteMovie.services";

const createMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieData: TMovieRequest = req.body;
  const newMovie: TMovie = await createMovieService(movieData);
  return res.status(201).json(newMovie);
};

const getMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let page: string | undefined = String(req.query.page);
  let perPage: string | undefined = String(req.query.perPage);
  let sort: string | undefined = String(req.query.sort);
  let order: string | undefined = String(req.query.order);

  const moviesArr = await getMoviesService(perPage, page, order, sort);
  return res.status(200).json(moviesArr);
};

const updateMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = Number(req.params.id);

  const updatedMovie: TMovie = await updateMovieService(req.body, id);
  return res.status(200).json(updatedMovie);
};

const deleteMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = Number(req.params.id);
  await deleteMovieService(id);

  return res.status(204).send();
};

export {
  createMovieController,
  getMoviesController,
  updateMovieController,
  deleteMovieController,
};
