import { tokenTypes } from "../types/tokenTypes";

export function setTokenAction(token) {
    return {
      type: tokenTypes.SET_TOKEN,
      payload: { token },
    };
  }