// libraries
import React, { Component } from "react";
import PropTypes from "prop-types";

// src
import { apiCall } from "../services/api";
import UserBasicInfo from "./UserBasicInfo";
import UserExperiences from "./UserExperiences";
import UserEducations from "./UserEducations";
import UserSkills from "./UserSkills"

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      userIsEdit: false,
      experienceIsEdit: false,
      educationIsEdit: false,
      skillsIsEdit: false,
      isCurrentUser: false,
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
      if(this.props.currentUser.user.username === user.data.username) {
        this.setState({ isCurrentUser: true })
      }
    } catch (err) {
      this.props.history.push("/");
    }
  }

  render() {
    let { firstName, lastName, photo, currentCompanyName, experience, skills, education } = this.state.user;
    return (
      <div>
        <h1>UserProfile!!!</h1>
        <UserBasicInfo firstName={firstName} lastName={lastName} photo={photo} currentCompanyName={currentCompanyName} isCurrentUser={this.state.isCurrentUser} />
        <UserExperiences  experiences={experience || []} isCurrentUser={this.state.isCurrentUser} />
        <UserEducations  educations={education || []} isCurrentUser={this.state.isCurrentUser} />
        <UserSkills skills={skills || []} isCurrentUser={this.state.isCurrentUser} />
        {/* 
            UserEducation
        */}
         
      </div>
    )
  }
}

UserProfile.propTypes = {
  currentUser: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object
};

export default UserProfile;
