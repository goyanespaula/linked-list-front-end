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
    const basicInfoField = this.state.userIsEdit ? (
      <EditUserBasicInfo
        firstName={firstName}
        lastName={lastName}
        photo={photo}
        currentCompanyName={currentCompanyName}
        closeEditor={this.closeEditors.bind(this)}
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
    return (
      <div>
        <h1>UserProfile!!!</h1>
        {basicInfoField}
        <UserExperiences
          experiences={experience || []}
          isCurrentUser={this.state.isCurrentUser}
        />
        <UserEducations
          educations={education || []}
          isCurrentUser={this.state.isCurrentUser}
        />
        <UserSkills
          skills={skills || []}
          isCurrentUser={this.state.isCurrentUser}
        />
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
