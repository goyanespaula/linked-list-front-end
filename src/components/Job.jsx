import React from "react";
import { Link } from "react-router-dom";

const Job = ({ job }) => {
  return (
    <li className="list-group-item jobCard">
      <h1>Jobtitle: {job.title}</h1>
      <h3>
        Company:{" "}
        <Link to={`/companies/${job.company.handle}`}>{job.company.name}</Link>
      </h3>
      <h3>Salary: ${job.salary}</h3>
    </li>
  );
};

export default Job;
