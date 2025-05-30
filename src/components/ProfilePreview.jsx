const ProfilePreview = ({ info, error, onClick }) => {
  return (
    <div 
      className="profile-preview" 
      onClick={onClick} // Expands the view when clicked
      style={{ cursor: "pointer", border: "1px solid #ccc", padding: "10px", borderRadius: "4px", marginTop: "10px" }}
    >
      {/* If there is an error, display the message instead of user info */}
      {error ? (
        <p style={{ color: "red" }}>{error}</p> 
      ) : (
        <>
          {/* Displays the avatar */}
          <img 
            src={info.avatar_url} 
            alt="Avatar" 
            style={{ width: "50px", borderRadius: "50%", marginBottom: "10px" }} 
          />
          <h3>{info.name || info.login}</h3> {/* Show name if available, otherwise display the login */}
          <p>{info.bio ? info.bio : "No bio available."}</p> {/* Displays bio if available */}
        </>
      )}
    </div>
  );
};

export default ProfilePreview;
