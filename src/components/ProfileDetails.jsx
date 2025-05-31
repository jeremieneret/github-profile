const ProfileDetails = ({ info }) => {
  return (
    <div className="profile-details-container">
      <div className="profile-details">
        <img
          src={info.avatar_url}
          alt="Avatar"
        />
        {/* Display profile statistics */}
        <div className="profile-infos-container">
          <div className="profile-infos">
            <p>Followers</p>
            <div />
            <p>{info.followers}</p>
          </div>
          <div className="profile-infos">
            <p>Following</p>
            <div />
            <p>{info.following}</p>
          </div>
          <div className="profile-infos">
            <p>Location</p>
            <div />
            <p>{info.location ? info.location : "Not specified"}</p>
          </div>
        </div>
      </div>
      <div>
        <h1>{info.name || info.login}</h1> {/* Display name or login */}
        <p className="description">{info.bio ? info.bio : "No bio available."}</p> {/* Display bio or default message */}
      </div>
    </div>
  );
};

export default ProfileDetails;
