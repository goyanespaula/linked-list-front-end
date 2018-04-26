// modules
import React from "react";
import PropTypes from "prop-types";

// src

const UserEducation = ({ education }) => {
    let { institution, degree, endDate } = education;

    return (
        <div>
            <h3>{degree} @{institution}</h3>
            <h4>Completed: {endDate}</h4>
        </div>
    )
}

UserEducation.propTypes = {
    education: PropTypes.object
}

export default UserEducation;