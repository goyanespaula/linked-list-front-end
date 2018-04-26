// libraries
import React, { Component } from "react";
import PropTypes from "prop-types";

// src
import { apiCall } from "../services/api";

class UserShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      userIsEdit: false,
      experienceIsEdit: false,
      educationIsEdit: false,
      skillsIsEdit: false
    };
  }
  async componentDidMount() {
    try {
      const user = await apiCall(
        "get",
        `/users/${this.props.match.params.username}`,
        {}
      );
      this.setState({ user: user.data });
    } catch (err) {
      this.props.history.push("/");
    }
  }

  render() {
    return <div>Usershow!!!</div>;
  }
}

UserShow.propTypes = {
  currentUser: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object
};

export default UserShow;
