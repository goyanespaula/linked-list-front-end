import React, { Component } from "react";
import PropTypes from "prop-types";
import { apiCall } from "../services/api";

export default class UserFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      err: null
    };
  }

  async componentDidMount() {
    try {
      let jobList = await apiCall("get", "/jobs", {});
      this.setState({ jobs: [...jobList.data] });
    } catch (err) {
      err = err.toString();
      this.setState({ err });
    }
  }
  render() {
    return (
      <div>
        <h1>UserFeed did mount!</h1>
        <h1>{this.state.err}</h1>
        {this.state.jobs.map(job => <p>{job.title}</p>)}
      </div>
    );
  }
}
