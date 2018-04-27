// modules
import React from "react";
import PropTypes from "prop-types";

// src

const UserBasicInfo = ({
  firstName,
  lastName,
  currentCompanyName,
  isCurrentUser,
  photo,
  openEditor
}) => {
  photo = photo || "http://psmeuae.org/wp-content/uploads/2017/05/profile.jpg";
  let workStatus = currentCompanyName ? (
    <h4>Currrently working at {currentCompanyName}</h4>
  ) : (
    <h4>Looking for oportunities</h4>
  );
  let editBtn = isCurrentUser ? (
    <button className="btn btn-secondary" onClick={openEditor}>
      Edit user data
    </button>
  ) : (
    ""
  );
  return (
    <section>
      <img src={photo} alt="" />
      <h3>
        {firstName} {lastName}
      </h3>
      {workStatus}
      {editBtn}
    </section>
  );
};

UserBasicInfo.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  photo: PropTypes.string,
  currentCompanyName: PropTypes.string,
  isCurrentUser: PropTypes.bool,
  openEditor: PropTypes.func
};

export default UserBasicInfo;
