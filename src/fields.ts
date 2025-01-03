import { TField, Point } from './types';

export const fieldCreate = (hex: Point): TField => {
  return {
    hex: hex,
  };
};
