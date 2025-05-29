import React from "react";

const ProfilePreview = ({ info, onClick }) => {
  return (
    <div 
      className="profile-preview" 
      onClick={onClick} 
      style={{ cursor: "pointer", border: "1px solid #ccc", padding: "10px", borderRadius: "4px", marginTop: "10px" }}
    >
      <img 
        src={info.avatar_url} 
        alt="Avatar" 
        style={{ width: "50px", borderRadius: "50%", marginBottom: "10px" }} 
      />
      <h3>{info.name || info.login}</h3>
      <p>{info.bio ? info.bio : "No bio available."}</p>
    </div>
  );
};

export default ProfilePreview;
