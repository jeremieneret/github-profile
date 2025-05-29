import React from "react";

const ProfileDetails = ({ info }) => {
  return (
    <div className="profile-details" style={{ marginTop: "20px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img 
          src={info.avatar_url} 
          alt="Avatar" 
          style={{ width: "100px", borderRadius: "50%", marginRight: "20px" }}
        />
        <div>
          <p><strong>Followers:</strong> {info.followers}</p>
          <p><strong>Following:</strong> {info.following}</p>
          <p><strong>Location:</strong> {info.location ? info.location : "Not specified"}</p>
        </div>
      </div>
      <div style={{ marginTop: "10px" }}>
        <h1>{info.name || info.login}</h1>
        <p>{info.bio ? info.bio : "No bio available."}</p>
      </div>
    </div>
  );
};

export default ProfileDetails;
