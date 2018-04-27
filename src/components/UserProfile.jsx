// libraries
import React, { Component } from "react";
import PropTypes from "prop-types";

// src
import { apiCall } from "../services/api";
import UserBasicInfo from "./UserBasicInfo";
import UserExperiences from "./UserExperiences";
import UserEducations from "./UserEducations";
import UserSkills from "./UserSkills";
import EditUserBasicInfo from "../containers/EditUserBasicInfo";
import EditUserSkills from "../containers/EditUserSkills";
import EditUserExperiences from "../containers/EditUserExperiences";

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
      if (this.props.currentUser.user.username === user.data.username) {
        this.setState({ isCurrentUser: true });
      }
    } catch (err) {
      this.props.history.push("/");
    }
  }

  openEditor(editField) {
    this.setState({ [editField]: true });
  }

  closeEditors() {
    this.setState({
      userIsEdit: false,
      experienceIsEdit: false,
      educationIsEdit: false,
      skillsIsEdit: false
    });
  }

  async updateUser() {
    try {
      const user = await apiCall(
        "get",
        `/users/${this.props.match.params.username}`,
        {}
      );
      this.setState({ user: user.data });
      if (this.props.currentUser.user.username === user.data.username) {
        this.setState({ isCurrentUser: true });
      }
    } catch (err) {
      this.props.history.push("/");
    }
  }

  render() {
    let {
      firstName,
      lastName,
      photo,
      currentCompanyName,
      experience,
      skills,
      education
    } = this.state.user;
    // USER BASIC INFO PANEL
    const basicInfoField = this.state.userIsEdit ? (
      <EditUserBasicInfo
        firstName={firstName}
        lastName={lastName}
        photo={photo}
        currentCompanyName={currentCompanyName}
        closeEditor={this.closeEditors.bind(this)}
        updateUser={this.updateUser.bind(this)}
      />
    ) : (
      <UserBasicInfo
        firstName={firstName}
        lastName={lastName}
        photo={photo}
        currentCompanyName={currentCompanyName}
        isCurrentUser={this.state.isCurrentUser}
        openEditor={this.openEditor.bind(this, "userIsEdit")}
      />
    );
    // USER SKILLS PANEL
    const skillsField = this.state.skillsIsEdit ? (
      <EditUserSkills
        skills={skills || []}
        closeEditor={this.closeEditors.bind(this)}
        updateUser={this.updateUser.bind(this)}
      />
    ) : (
      <UserSkills
        skills={skills || []}
        isCurrentUser={this.state.isCurrentUser}
        openEditor={this.openEditor.bind(this, "skillsIsEdit")}
      />
    );
    // USER EXPERIENCES PANEL
    const experiencesField = this.state.experienceIsEdit ? (
      <EditUserExperiences
        experiences={experience || []}
        closeEditor={this.closeEditors.bind(this)}
        updateUser={this.updateUser.bind(this)}
      />
    ) : (
      <UserExperiences
        experiences={experience || []}
        isCurrentUser={this.state.isCurrentUser}
        openEditor={this.openEditor.bind(this, "experienceIsEdit")}
      />
    );

    return (
      <div>
        <h1>UserProfile!!!</h1>
        {basicInfoField}
        {experiencesField}
        <UserEducations
          educations={education || []}
          isCurrentUser={this.state.isCurrentUser}
        />
        {skillsField}
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
