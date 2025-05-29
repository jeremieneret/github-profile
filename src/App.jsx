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
  const [expanded, setExpanded] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // Function to calculate the number of days since the last update
  const getDaysElapsed = (dateString) => {
    const updatedDate = new Date(dateString);
    const now = new Date();
    return Math.floor((now - updatedDate) / (1000 * 60 * 60 * 24));
  };

  useEffect(() => {
    if (!username) {
      setInfo(null);
      setRepos([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    // Fetch user info and repositories in parallel
    Promise.all([
      axios.get(`https://api.github.com/users/${username}`),
      axios.get(`https://api.github.com/users/${username}/repos`)
    ])
      .then(([userResponse, reposResponse]) => {
        setInfo(userResponse.data);
        setRepos(reposResponse.data);
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message || "An error occurred");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [username]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setExpanded(false);
    setShowAll(false);
  };

  const handleEnter = () => {
    if (info) {
      setExpanded(true);
    }
  };

  return (
    <div className="app-container">
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <SearchInput username={username} onUsernameChange={handleUsernameChange} onEnter={handleEnter} />
      {isLoading && <p>Loading data...</p>}
      {info && !expanded && <ProfilePreview info={info} onClick={() => setExpanded(true)} />}
      {expanded && info && <ProfileDetails info={info} />}
      {expanded && info && <RepoList repos={repos} showAll={showAll} getDaysElapsed={getDaysElapsed} onViewAll={() => setShowAll(true)} />}
    </div>
  );
}

export default App;
