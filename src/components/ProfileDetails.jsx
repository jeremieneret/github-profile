const ProfileDetails = ({ info }) => {
  return (
    <div className="profile-details" style={{ marginTop: "20px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Enlarged avatar */}
        <img 
          src={info.avatar_url} 
          alt="Avatar" 
          style={{ width: "100px", borderRadius: "50%", marginRight: "20px" }}
        />
        {/* Display profile statistics */}
        <div>
          <p><strong>Followers:</strong> {info.followers}</p>
          <p><strong>Following:</strong> {info.following}</p>
          <p><strong>Location:</strong> {info.location ? info.location : "Not specified"}</p>
        </div>
      </div>
      <div style={{ marginTop: "10px" }}>
        <h1>{info.name || info.login}</h1> {/* Display name or login */}
        <p>{info.bio ? info.bio : "No bio available."}</p> {/* Display bio or default message */}
      </div>
    </div>
  );
};

export default ProfileDetails;
