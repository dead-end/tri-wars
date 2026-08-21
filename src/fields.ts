import { TField, TPoint } from './types';

/**
 * TODO: The field will contain objects (e.g. ships) or markers (highlight)
 */
export const fieldCreate = (hex: TPoint): TField => {
  return {
    hex: hex,
  };
};
