import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import UserFeed from './UserFeed';

const UserHomepage = ({ currentUser }) => {
  if (!currentUser.isAuthenticated) {
    return (
      <div>
        <h1>Welcome to Linked List!</h1>
        <Link to="/signup">Sign up here</Link>
      </div>
    );
  }
  return (
    <UserFeed currentUser={currentUser} />
  );
};

UserHomepage.propTypes = {
  currentUser: PropTypes.object
};

export default UserHomepage;
