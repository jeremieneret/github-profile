const ProfileDetails = ({ info }) => {
  return (
    <div className="profile-details">
      <div>
        <img 
          src={info.avatar_url} 
          alt="Avatar" 
        />
        {/* Display profile statistics */}
        <div>
          <p><strong>Followers:</strong> {info.followers}</p>
          <p><strong>Following:</strong> {info.following}</p>
          <p><strong>Location:</strong> {info.location ? info.location : "Not specified"}</p>
        </div>
      </div>
      <div>
        <h1>{info.name || info.login}</h1> {/* Display name or login */}
        <p>{info.bio ? info.bio : "No bio available."}</p> {/* Display bio or default message */}
      </div>
    </div>
  );
};

export default ProfileDetails;
