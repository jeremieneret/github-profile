import { useState, useEffect } from "react";
import axios from "axios";
import SearchInput from "./components/SearchInput";
import ProfilePreview from "./components/ProfilePreview";
import ProfileDetails from "./components/ProfileDetails";
import RepoList from "./components/RepoList";
import "./style/CSS/style.css";

function App() {
  const [username, setUsername] = useState("");
  const [info, setInfo] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // Helper function to calculate days elapsed since last update
  const getDaysElapsed = (dateString) => {
    const updatedDate = new Date(dateString);
    const now = new Date();
    return Math.floor((now - updatedDate) / (1000 * 60 * 60 * 24));
  };

  useEffect(() => {
    if (!username) {
      setInfo(null);
      setRepos([]);
      setShowDropdown(false);
      return;
    }
  }, [username]);

  // Fetch data on "Enter" key press
  const handleEnter = () => {
    if (!username) return;

    setIsLoading(true);
    setError(null);

    Promise.all([
      axios.get(`https://api.github.com/users/${username}`),
      axios.get(`https://api.github.com/users/${username}/repos`)
    ])
      .then(([userResponse, reposResponse]) => {
        setInfo(userResponse.data);
        setRepos(reposResponse.data);
        setShowDropdown(true); // Show dropdown after fetching data
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message || "An error occurred");
        setShowDropdown(true); // Show dropdown with error message
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Handle input change, reset states
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setExpanded(false);
    setShowDropdown(false);
    setShowAll(false);
  };

  // Expands full profile and hides the dropdown
  const handleDropdownClick = () => {
    if (!error) {
      setExpanded(true);
      setShowDropdown(false); // Hide dropdown on click
    }
  };

  return (
    <>
      <div className="background-img"></div>
      <div className="app-container">
        <SearchInput username={username} onUsernameChange={handleUsernameChange} onEnter={handleEnter} />

        {isLoading && <p>Loading data...</p>}

        {/* Only display dropdown if `expanded` is FALSE */}
        {showDropdown && !expanded && <ProfilePreview info={info} error={error} onClick={handleDropdownClick} />}

        <div className="full-details">
          {/* Show full details only after clicking the dropdown */}
          {expanded && !error && <ProfileDetails info={info} />}
          {expanded && !error && <RepoList repos={repos} showAll={showAll} getDaysElapsed={getDaysElapsed} onViewAll={() => setShowAll(true)} />}
        </div>
      </div>
    </>
  );
}

export default App;
