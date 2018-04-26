// modules
import React from "react";
import PropTypes from "prop-types";

// src
import UserExperience from './UserExperience';

const UserExperiences = ({ experiences, isCurrentUser }) => {
    let experienceList = experiences.map((xp, idx) => <UserExperience key={idx} experience={xp} /> )
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