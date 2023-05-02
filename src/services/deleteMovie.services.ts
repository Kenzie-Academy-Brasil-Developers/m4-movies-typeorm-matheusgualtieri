import { TMovie, TMovieRepo } from "../interfaces/movie.interfaces";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { movieSchema } from "../schemas/movie.schemas";

const deleteMovieService = async (id: number) => {
  const movieRepo: TMovieRepo = AppDataSource.getRepository(Movie);

  const movie: Movie | null = await movieRepo.findOneBy({ id });
  if (movie != null) {
    await movieRepo.remove(movie);

    const returnMovie: TMovie = movieSchema.parse(movie);

    return returnMovie;
  }
};

export default deleteMovieService;
