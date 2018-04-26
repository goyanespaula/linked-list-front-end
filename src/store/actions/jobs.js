import { apiCall } from "../../services/api";
import { addError, removeError } from "./errors";
import { SET_JOBS } from "../actionTypes";

export function getJobs(type, data) {
  return async dispatch => {
    try {
      let jobs = await apiCall("get", `/jobs`, {});
      dispatch(setJobs(jobs.data));
      dispatch(removeError());
      return;
    } catch (err) {
      dispatch(addError(err.message));
      return Promise.reject(err);
    }
  };
}

export function setJobs(jobs) {
  return {
    type: SET_JOBS,
    jobs
  };
}
