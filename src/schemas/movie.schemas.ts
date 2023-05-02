import { number, string } from "yargs";
import { z } from "zod";

const movieSchema = z.object({
  id: z.number(),
  name: z.string().max(50),
  description: z.string().nullish(),
  duration: z.number().int().positive(),
  price: z.number().int().min(0),
});

const movieSchemaRequest = movieSchema.omit({ id: true });
const movieSchemaUpdate = movieSchema.omit({ id: true }).partial();
const movieArrSchema = z.array(movieSchema);

const moviesPagination = z.object({
  prevPage: z.string().nullable(),
  nextPage: z.string().nullable(),
  count: z.number(),
  data: movieArrSchema,
});

export {
  movieSchema,
  movieSchemaRequest,
  movieArrSchema,
  movieSchemaUpdate,
  moviesPagination,
};
