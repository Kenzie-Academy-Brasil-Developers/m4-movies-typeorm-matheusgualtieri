import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { TMovieRepo } from "../interfaces/movie.interfaces";
import { AppError } from "../error";

const checkIfNameExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const name = req.body.name;
  const movieRepo: TMovieRepo = AppDataSource.getRepository(Movie);

  const movie: boolean | null = await movieRepo.exist({
    where: {
      name: name,
    },
  });
  if (movie) {
    throw new AppError("Movie already exists.", 409);
  }
  return next();
};

export default checkIfNameExistMiddleware;
