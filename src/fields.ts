import { TField, TPoint } from './types';

export const fieldCreate = (hex: TPoint): TField => {
  return {
    hex: hex,
  };
};
