import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import {
  TMovie,
  TMovieArr,
  TMovieRepo,
  TMoviesPagination,
} from "../interfaces/movie.interfaces";
import { movieArrSchema, moviesPagination } from "../schemas/movie.schemas";

const getMoviesService = async (
  perPage: any,
  page: any,
  order: any,
  sort: any
): Promise<TMoviesPagination> => {
  const movieRepo: TMovieRepo = AppDataSource.getRepository(Movie);

  perPage =
    perPage === "undefined" || perPage === "invalidInput" ? 5 : Number(perPage);
  if (perPage <= 0 || perPage > 5) {
    perPage = 5;
  }
  page = page === "undefined" || page === "invalidInput" ? 1 : Number(page);
  if (page <= 0) {
    page = 1;
  }
  order = order.toLowerCase();
  if (order != "desc") {
    order = "asc";
  }

  const allMovies: Array<Movie> = await movieRepo.find();

  const take: number = Number(perPage) || 5;
  const skip: number = Number(page) || 1;
  const arrayOrder = order || "asc";

  const checkIfHasNextPage: number = Math.ceil(
    allMovies.length / Number(perPage)
  );

  const prevPage: string | null =
    Number(page) > 1
      ? `http://localhost:3000/movies?page=${page - 1}&perPage=${take}`
      : null;
  const nextPage: string | null =
    Number(page) < checkIfHasNextPage
      ? `http://localhost:3000/movies?page=${page + 1}&perPage=${take}`
      : null;

  let orderObj = {};

  if (sort === "price") {
    orderObj = {
      price: arrayOrder,
    };
  } else if (sort === "duration") {
    orderObj = {
      duration: arrayOrder,
    };
  } else {
    orderObj = {
      id: arrayOrder,
    };
  }

  const movies: Array<Movie> = await movieRepo.find({
    take: take,
    skip: (skip - 1) * take,
    order: orderObj,
  });

  movieArrSchema.parse(movies);

  const pagination: TMoviesPagination = {
    prevPage: prevPage,
    nextPage: nextPage,
    count: allMovies.length,
    data: movies,
  };
  return moviesPagination.parse(pagination);
};

export default getMoviesService;
