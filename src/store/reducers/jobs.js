import { SET_JOBS } from "../actionTypes";

const DEFAULT_STATE = [];

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SET_JOBS:
      return action.jobs;
    default:
      return state;
  }
}
