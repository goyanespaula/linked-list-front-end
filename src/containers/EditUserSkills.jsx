// libraries
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { apiCall } from "../services/api";
import { addError, removeError } from "../store/actions/errors";
// import { ADD_ERROR,  } from "../store/actionTypes"

class EditUserSkills extends Component {
  constructor(props) {
    super(props);
    this.state = {
        // skills: [ ],
        skill: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

//   static getDerivedStateFromProps(nextProps, prevState) {
//     return {
//       skills: nextProps.skills
//     };
//   }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleEditSubmit(event) {
    event.preventDefault();
    let newSkills = { skills: [ ...this.props.skills, this.state.skill ]}
    
    try {
      await apiCall('patch', `/users/${this.props.match.params.username}`, newSkills)
      this.props.updateUser();
      this.props.dispatch(removeError());
    } catch (err) {
      this.props.dispatch(addError(err.message));
    }
    this.props.closeEditor();
  }

  async handleDelete(i, event) {
    event.preventDefault();
    let skillList = [...this.props.skills];
    skillList.splice(i, 1)
    let newSkills = { skills: skillList }
    
    try {
      await apiCall('patch', `/users/${this.props.match.params.username}`, newSkills)
      this.props.updateUser();
      this.props.dispatch(removeError());
    } catch (err) {
      this.props.dispatch(addError(err.message));
    }
    this.props.closeEditor();
  }

  render() {
    let skillList = this.props.skills.map((skill, idx) => <li key={idx} className="skill">{skill} <button className="btn btn-danger btn-sm" onClick={this.handleDelete.bind(this, idx)}><i class="fas fa-times"></i></button></li>);
    return (
        <div>
            <ul>
                {skillList}
            </ul>
            <li className="list-group-item mx-auto">
            <form
            className="my-3 text-left edit-todo-form"
            onSubmit={this.handleEditSubmit.bind(this)}
            >
            <div className="form-group">
                <label className="mb-0">Skill</label>
                <div className="d-flex inline-flex">
                <input
                    type="text"
                    className="form-control"
                    id="skill"
                    name="skill"
                    placeholder="Add new skill"
                    value={this.state.skill}
                    onChange={this.handleChange}
                    required
                />
                <button
                    type="submit"
                    className="btn btn-warning d-inline ml-1"
                    onClick={this.props.closeEditor}
                >
                    Close
                </button>
                </div>
            </div>
            <button
                type="submit"
                className="btn btn-secondary btn-block d-inline"
            >
                Commit your changes!
            </button>
            </form>
        </li>
      </div>
      
    );
  }
}

EditUserSkills.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  photo: PropTypes.string,
  currentCompanyName: PropTypes.string,
  closeEditor: PropTypes.func,
  updateUser: PropTypes.func
};

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

export default withRouter(connect(mapStateToProps)(EditUserSkills));

// const UserSkills = ({ skills, isCurrentUser }) => {
//     let skillList = skills.map((skill, idx) => <li key={idx} className="skill">{skill}</li>);
//     let editBtn = isCurrentUser ? <button className="btn btn-secondary">Edit user data</button> : '';

//     return (
//         <div>
//             <ul>
//                 {skillList}
//             </ul>
//             {editBtn}
//         </div>
//     )
// }

// UserSkills.propTypes = {
//     skills: PropTypes.array
// }

// export default UserSkills;