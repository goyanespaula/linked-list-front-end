import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getJobs } from "../store/actions/jobs";
import Job from "./Job";

const propTypes = {
  currentUser: PropTypes.object.isRequired,
  jobs: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  getJobs: PropTypes.func.isRequired
};

class UserFeed extends Component {
  componentDidMount() {
    this.props
      .getJobs()
      .then(() => {})
      .catch(() => {
        return;
      });
  }
  //   async componentDidMount() {
  //     try {
  //       let jobList = await apiCall("get", "/jobs", {});
  //       this.setState({ jobs: [...jobList.data] });
  //     } catch (err) {
  //       this.props.dispatch(addError(err.message));
  //       return Promise.reject(err);
  //       //   err = err.toString();
  //       //   this.setState({ err });
  //     }
  //   }
  render() {
    let jobs = this.props.jobs.map(job => <Job job={job} />);
    return (
      <div>
        <h1>UserFeed did mount!</h1>
        <h1>{this.props.errors.message}</h1>
        <ul className="list-group">{jobs}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("THIS IS THE STATE", state);
  return {
    currentUser: state.currentUser,
    errors: state.errors,
    jobs: state.jobs
  };
};

UserFeed.propTypes = propTypes;

export default withRouter(connect(mapStateToProps, { getJobs })(UserFeed));

// {
//   this.props.jobs.map(job => <p>{job.title}</p>);
// }
