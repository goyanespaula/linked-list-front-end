// libraries
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { apiCall } from "../services/api";
import { addError, removeError } from "../store/actions/errors";
import UserExperience from "../components/UserExperience";

class EditUserExperiences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobTitle: "",
      companyName: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleEditSubmit(event) {
    event.preventDefault();
    let startDate = `${this.state.startYear}-${this.state.startMonth}-01`;
    let endDate = `${this.state.endYear}-${this.state.endMonth}-01`;

    let newExperience = {
      jobTitle: this.state.jobTitle,
      companyName: this.state.companyName,
      startDate,
      endDate
    };
    let cleanedExps = this.props.experiences.map(exp => {
      delete exp._id;
      exp.startDate = exp.startDate.split("T")[0];
      exp.endDate = exp.endDate.split("T")[0];
      return exp;
    });
    let prevExps = cleanedExps.filter(
      xp => new Date(xp.endDate) <= new Date(endDate)
    );
    let laterExps = cleanedExps.filter(
      xp => new Date(xp.endDate) > new Date(endDate)
    );
    let newExperiences = {
      experience: [...laterExps, newExperience, ...prevExps]
    };
    try {
      await apiCall(
        "patch",
        `/users/${this.props.match.params.username}`,
        newExperiences
      );
      this.props.updateUser();
      this.props.dispatch(removeError());
    } catch (err) {
      this.props.dispatch(addError(err.message));
    }
    this.props.closeEditor();
  }

  async handleDelete(i, event) {
    event.preventDefault();
    let cleanedExps = this.props.experiences.map(exp => {
      delete exp._id;
      exp.startDate = exp.startDate.split("T")[0];
      exp.endDate = exp.endDate.split("T")[0];
      return exp;
    });
    cleanedExps.splice(i, 1);
    let newExperiences = { experience: cleanedExps };

    try {
      await apiCall(
        "patch",
        `/users/${this.props.match.params.username}`,
        newExperiences
      );
      this.props.updateUser();
      this.props.dispatch(removeError());
    } catch (err) {
      this.props.dispatch(addError(err.message));
    }
    this.props.closeEditor();
  }

  render() {
    let experiencesList = this.props.experiences.map((exp, idx) => (
      <li key={idx} className="experience">
        <UserExperience experience={exp} />
        <button
          className="btn btn-danger btn-sm"
          onClick={this.handleDelete.bind(this, idx)}
        >
          <i className="fas fa-times" />
        </button>
      </li>
    ));

    const years = Array.from({ length: 50 });
    let optionYears = years.map((val, idx) => {
      return (
        <option key={idx + 1969} value={idx + 1969}>
          {idx + 1969}
        </option>
      );
    });

    return (
      <div>
        <ul>{experiencesList}</ul>
        <li className="list-group-item mx-auto">
          <form
            className="my-3 text-left edit-todo-form"
            onSubmit={this.handleEditSubmit.bind(this)}
          >
            <div className="form-group">
              <label className="mb-0">Job Title</label>
              <div className="d-flex inline-flex">
                <input
                  type="text"
                  className="form-control"
                  id="jobTitle"
                  name="jobTitle"
                  placeholder="Add job title"
                  value={this.state.jobTitle}
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
            <div className="form-group">
              <label className="mb-0">Company Name</label>
              <div className="d-flex inline-flex">
                <input
                  type="text"
                  className="form-control"
                  id="companyName"
                  name="companyName"
                  placeholder="Add job title"
                  value={this.state.companyName}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <select
                  className="custom-select"
                  name="startYear"
                  id="startYear"
                  onChange={this.handleChange}
                >
                  <option selected>Choose a year...</option>
                  {optionYears}
                </select>
                <select
                  className="custom-select"
                  name="startMonth"
                  id="startMonth"
                  onChange={this.handleChange}
                >
                  <option selected>Choose...</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
              <div className="input-group mb-3">
                <select
                  className="custom-select"
                  name="endYear"
                  id="endYear"
                  onChange={this.handleChange}
                >
                  <option selected>Choose a year...</option>
                  {optionYears}
                </select>
                <select
                  className="custom-select"
                  name="endMonth"
                  id="endMonth"
                  onChange={this.handleChange}
                >
                  <option selected>Choose...</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
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

EditUserExperiences.propTypes = {
  experiences: PropTypes.array,
  closeEditor: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

export default withRouter(connect(mapStateToProps)(EditUserExperiences));
