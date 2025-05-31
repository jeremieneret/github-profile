const ProfilePreview = ({ info, error, onClick }) => {
  return (
    <div
      className="profile-preview"
      onClick={onClick} // Expands the view when clicked
    >
      {/* If there is an error, display the message instead of user info */}
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          {/* Displays the avatar */}
          <img
            src={info.avatar_url}
            alt="Avatar"
          />
          <div className="text">
            <p className="username">{info.name || info.login}</p> {/* Show name if available, otherwise display the login */}
            <p className="description">{info.bio ? info.bio : "No bio available."}</p> {/* Displays bio if available */}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePreview;
