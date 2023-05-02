import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

const validateBodyMiddleware =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction): Response | void => {
    const validate = schema.parse(req.body);

    req.body = validate;

    return next();
  };

export default validateBodyMiddleware;
