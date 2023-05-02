import { z } from "zod";
import {
  movieArrSchema,
  movieSchema,
  movieSchemaRequest,
  movieSchemaUpdate,
  moviesPagination,
} from "../schemas/movie.schemas";
import { Movie } from "../entities";
import { DeepPartial, Repository } from "typeorm";

type TMovie = z.infer<typeof movieSchema>;
type TMovieArr = z.infer<typeof movieArrSchema>;
type TMovieUpdate = z.infer<typeof movieSchemaUpdate>;
type TMovieSchemaUpdateDeepPartial = DeepPartial<TMovieRequest>;
type TMovieRequest = z.infer<typeof movieSchemaRequest>;
type TMoviesPagination = z.infer<typeof moviesPagination>;

type TMovieRepo = Repository<Movie>;
export {
  TMovie,
  TMovieRequest,
  TMovieRepo,
  TMovieArr,
  TMovieUpdate,
  TMovieSchemaUpdateDeepPartial,
  TMoviesPagination,
};
