import {
  TMovie,
  TMovieRepo,
  TMovieRequest,
} from "../interfaces/movie.interfaces";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { movieSchema } from "../schemas/movie.schemas";

const createMovieService = async (data: TMovieRequest): Promise<TMovie> => {
  const movieRepo: TMovieRepo = AppDataSource.getRepository(Movie);

  const movie: Movie = movieRepo.create(data);

  await movieRepo.save(movie);

  const returnMovie: TMovie = movieSchema.parse(movie);

  return returnMovie;
};

export default createMovieService;
