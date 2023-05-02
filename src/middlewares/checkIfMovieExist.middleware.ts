import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { TMovieRepo } from "../interfaces/movie.interfaces";
import { AppError } from "../error";

const checkIfMovieExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id = Number(req.params.id);
  const movieRepo: TMovieRepo = AppDataSource.getRepository(Movie);
  if (!id) {
    throw new AppError("Movie not found", 404);
  }
  const movie: Movie | null = await movieRepo.findOneBy({ id });
  if (!movie) {
    throw new AppError("Movie not found", 404);
  }
  return next();
};

export default checkIfMovieExistMiddleware;
