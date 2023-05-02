import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import {
  TMovie,
  TMovieRepo,
  TMovieSchemaUpdateDeepPartial,
} from "../interfaces/movie.interfaces";
import { movieSchema } from "../schemas/movie.schemas";

const updateMovieService = async (
  data: TMovieSchemaUpdateDeepPartial,
  id: number
): Promise<TMovie> => {
  const movieRepo: TMovieRepo = AppDataSource.getRepository(Movie);

  const movie: Movie | null = await movieRepo.findOneBy({ id });

  const updateMovie: Movie = movieRepo.create({
    ...movie,
    ...data,
  });

  await movieRepo.save(updateMovie);

  const returnMovie: TMovie = movieSchema.parse(updateMovie);

  return returnMovie;
};

export default updateMovieService;
