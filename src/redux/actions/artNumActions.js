import { artNumTypes } from '../types/artNumTypes';
import { artNumTypes } from '../types/artNumTypes';

export function setArtNumAction(artNum) {
  return {
    type: artNumTypes.SET_ART_NUM,
    payload: { artNum },
  };
}