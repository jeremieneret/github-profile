import { useState, useEffect } from "react";
import axios from "axios";
import SearchInput from "./components/SearchInput";
import ProfilePreview from "./components/ProfilePreview";
import ProfileDetails from "./components/ProfileDetails";
import RepoList from "./components/RepoList";
import "./style/CSS/style.css";

function App() {
  const [username, setUsername] = useState(""); // Stores the entered username
  const [info, setInfo] = useState(null); // Stores user profile data
  const [repos, setRepos] = useState([]); // Stores repositories data
  const [error, setError] = useState(null); // Stores any API errors
  const [isLoading, setIsLoading] = useState(false); // Tracks loading state
  const [showDropdown, setShowDropdown] = useState(false); // Controls dropdown visibility
  const [expanded, setExpanded] = useState(false); // Controls full profile visibility
  const [showAll, setShowAll] = useState(false); // Controls repository list expansion

  // Function to calculate the number of days since the last update
  const getDaysElapsed = (dateString) => {
    const updatedDate = new Date(dateString);
    const now = new Date();
    return Math.floor((now - updatedDate) / (1000 * 60 * 60 * 24));
  };

  useEffect(() => {
    // Clears the user info if input is empty
    if (!username) {
      setInfo(null);
      setRepos([]);
      setShowDropdown(false);
      return;
    }
  }, [username]);

  // Handles pressing "Enter" to fetch user data and display the dropdown
  const handleEnter = () => {
    if (!username) return;

    setIsLoading(true);
    setError(null);

    // Fetch profile and repositories simultaneously
    Promise.all([
      axios.get(`https://api.github.com/users/${username}`),
      axios.get(`https://api.github.com/users/${username}/repos`)
    ])
      .then(([userResponse, reposResponse]) => {
        setInfo(userResponse.data);
        setRepos(reposResponse.data);
        setShowDropdown(true); // Show dropdown after data retrieval
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message || "An error occurred");
        setShowDropdown(true); // Show dropdown with error message
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Handles input change, resets expanded state, and hides dropdown
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setExpanded(false);
    setShowDropdown(false);
    setShowAll(false);
  };

  // Expands the full view only if there is no error
  const handleDropdownClick = () => {
    if (!error) {
      setExpanded(true);
    }
  };

  return (
    <div className="app-container">
      {/* Input field for username */}
      <SearchInput username={username} onUsernameChange={handleUsernameChange} onEnter={handleEnter} />
      
      {/* Loading state indicator */}
      {isLoading && <p>Loading data...</p>}

      {/* Displays dropdown after "Enter" is pressed */}
      {showDropdown && <ProfilePreview info={info} error={error} onClick={handleDropdownClick} />}

      {/* Expands full profile details on dropdown click */}
      {expanded && !error && <ProfileDetails info={info} />}
      {expanded && !error && <RepoList repos={repos} showAll={showAll} getDaysElapsed={getDaysElapsed} onViewAll={() => setShowAll(true)} />}
    </div>
  );
}

export default App;
