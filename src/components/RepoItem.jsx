// src/components/RepoItem.js
import React from "react";

const RepoItem = ({ repo, getDaysElapsed }) => {
  return (
    <div 
      className="repo-item" 
      style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px", borderRadius: "4px" }}
    >
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
        <h3>{repo.name}</h3>
        <p>{repo.description ? repo.description : "No description available."}</p>
        <p><strong>Forks:</strong> {repo.forks_count}</p>
        <p><strong>Stars:</strong> {repo.stargazers_count}</p>
        <p><strong>Updated:</strong> {getDaysElapsed(repo.updated_at)} days ago</p>
      </a>
    </div>
  );
};

export default RepoItem;
