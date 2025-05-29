const ProfilePreview = ({ info, onClick }) => {
  return (
    <div 
      className="profile-preview" 
      onClick={onClick} 
      style={{ cursor: "pointer", border: "1px solid #ccc", padding: "10px", borderRadius: "4px", marginTop: "10px" }}
    >
      {/* Display the user's avatar */}
      <img 
        src={info.avatar_url} 
        alt="Avatar" 
        style={{ width: "50px", borderRadius: "50%", marginBottom: "10px" }} 
      />
      <h3>{info.name || info.login}</h3> {/* Show name if available, otherwise display the login */}
      <p>{info.bio ? info.bio : "No bio available."}</p> {/* Display bio if provided */}
    </div>
  );
};

export default ProfilePreview;
