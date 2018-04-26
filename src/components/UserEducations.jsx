// modules
import React from "react";
import PropTypes from "prop-types";

// src
import UserEducation from './UserEducation';

const UserEducations = ({ educations, isCurrentUser }) => {
    let educationList = educations.map((edu, idx) => <UserEducation key={idx} education={edu} /> )
    let editBtn = isCurrentUser ? <button className="btn btn-secondary">Edit user data</button> : '';

    return (
        <section>
            {educationList}
            {editBtn}
        </section>
    )
}

UserEducations.propTypes = {
    education: PropTypes.array
}

export default UserEducations;