// libraries
import React, { Component } from "react";
import PropTypes from "prop-types";

// src
import { apiCall } from "../services/api";
import UserBasicInfo from "./UserBasicInfo";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      userIsEdit: false,
      experienceIsEdit: false,
      educationIsEdit: false,
      skillsIsEdit: false,
      isCurrentUser: false
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
    let { firstName, lastName, photo, currentCompanyName } = this.state.user;
    return (
      <div>
        <h1>UserProfile!!!</h1>
        <UserBasicInfo
          firstName={firstName}
          lastName={lastName}
          photo={photo}
          currentCompanyName={currentCompanyName}
        />
        {/* UserExpreiences
            UserSkills
            UserEducation
        */}
      </div>
    );
  }
}

UserProfile.propTypes = {
  currentUser: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object
};

export default UserProfile;
