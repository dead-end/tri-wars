import { hexGetId } from './hex2';
import { hexNeighbor } from './hex/neighbor';
import { TField, Point } from './types';

export const FIELDS = new Map<string, TField>();

export const fieldCreate = (hex: Point) => {
  const field = {
    id: hexGetId(hex),
    hex: hex,
  };
  FIELDS.set(field.id, field);
  return field;
};

export const fieldGetNeighbor = (point: Point, i: number) => {
  const neighbor = hexNeighbor(point, i);
  const id = hexGetId(neighbor);
  return FIELDS.get(id);
};
