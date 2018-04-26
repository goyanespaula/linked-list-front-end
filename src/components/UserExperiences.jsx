// modules
import React from "react";
import PropTypes from "prop-types";

// src

const UserExperiences = ({ experiences, isCurrentUser }) => {
    let experienceList = experiences.map(xp => xp.jobTitle)
    let editBtn = isCurrentUser ? <button className="btn btn-secondary">Edit user data</button> : '';
    
    return (
        <section>
            {experienceList}
            {editBtn}
        </section>
    )
}

UserExperiences.propTypes = {
    experiences: PropTypes.array
}

export default UserExperiences;