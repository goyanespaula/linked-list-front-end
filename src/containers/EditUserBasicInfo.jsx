// libraries
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class EditUserBasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      firstName: nextProps.firstName,
      lastName: nextProps.lastName,
      currentCompanyName: nextProps.currentCompanyName,
      photo: nextProps.photo
    };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleEditSubmit(event) {
    event.preventDefault();
    // this.props.editTodo({
    //   firstName: this.state.firstName,
    //   lastName: this.state.lastName,
    //   currentCompanyName: this.state.currentCompanyName,
    //   photo: this.state.photo
    // });
  }

  render() {
    return (
      <li className="list-group-item mx-auto">
        <form
          className="my-3 text-left edit-todo-form"
          onSubmit={this.handleEditSubmit.bind(this)}
        >
          <div className="form-group">
            <label className="mb-0">firstName</label>
            <div className="d-flex inline-flex">
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder="Edit firstName"
                value={this.state.firstName}
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
            <label className="mb-0">lastName</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              placeholder="Edit lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label className="mb-0">photo</label>
            <input
              type="text"
              className="form-control"
              id="photo"
              name="photo"
              placeholder="Edit photo"
              value={this.state.photo}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label className="mb-0">currentCompanyName</label>
            <input
              type="text"
              className="form-control"
              id="currentCompanyName"
              name="currentCompanyName"
              placeholder="Edit currentCompanyName"
              value={this.state.currentCompanyName}
              onChange={this.handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-secondary btn-block d-inline"
          >
            Commit your changes!
          </button>
        </form>
      </li>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

export default withRouter(connect(mapStateToProps)(EditUserBasicInfo));
