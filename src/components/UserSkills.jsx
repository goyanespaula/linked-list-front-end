// modules
import React from "react";
import PropTypes from "prop-types";

// src

const UserSkills = ({ skills, isCurrentUser, openEditor }) => {
    let skillList = skills.map((skill, idx) => <li key={idx} className="skill">{skill}</li>);
    let editBtn = isCurrentUser ? <button className="btn btn-secondary" onClick={openEditor}>Edit user data</button> : '';

    return (
        <div>
            <ul>
                {skillList}
            </ul>
            {editBtn}
        </div>
    )
}

UserSkills.propTypes = {
    skills: PropTypes.array
}

export default UserSkills;