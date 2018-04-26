// libraries
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

// src
import { getJobs } from "../store/actions/jobs";
import Job from "../components/Job";

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

  render() {
    let jobs = this.props.jobs.map(job => <Job job={job} />);
    let username = this.props.currentUser.user.username;
    return (
      <div>
        <h1>
          Hi <Link to={`/users/${username}`}>{username}</Link>
        </h1>
        <h1>{this.props.errors.message}</h1>
        <ul className="list-group">{jobs}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    errors: state.errors,
    jobs: state.jobs
  };
};

UserFeed.propTypes = propTypes;

export default withRouter(connect(mapStateToProps, { getJobs })(UserFeed));
