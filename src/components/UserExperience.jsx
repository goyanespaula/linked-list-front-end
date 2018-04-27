// modules
import React from "react";
import PropTypes from "prop-types";

// src

const UserExperience = ({ experience }) => {
    let {jobTitle, companyName, startDate, endDate } = experience

    return (
        <div>
            <h3>{jobTitle} @{companyName}</h3>
            <h4>Started: {startDate}</h4>
            <h4>Ended: {endDate}</h4>
        </div>
    )
}

UserExperience.propTypes = {
    experience: PropTypes.object
}

export default UserExperience;