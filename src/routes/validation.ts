import { BadRequestError } from "../util/errors";

/**
 * Typeguard: value is a string
 * (Checks if it satisfies length constraints if provided)
 */
export const isValidString = (
  value: unknown,
  constraints?: { min: number; max: number }
): value is string => {
  if (typeof value !== "string") return false;
  return constraints
    ? value.length >= constraints.min && value.length <= constraints.max
    : true;
};

/** Typeguard: value is a positive integer */
export const isPositiveInteger = (value: unknown): value is number =>
  Number.isInteger(value) && Number(value) >= 0;

/** Returns id as number and throws if not a positive integer  */
export const validateId = (id: unknown) => {
  if (!id) throw new BadRequestError("Request is missing ID param");

  const parsedId = Number(id);
  if (!isPositiveInteger(parsedId))
    throw new BadRequestError("Id must be a number");

  return parsedId;
};
