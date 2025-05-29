// src/App.jsx
import React, { useState, useEffect } from "react";
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

  // Helper pour calculer le nombre de jours écoulés depuis une date donnée
  const getDaysElapsed = (dateString) => {
    const updatedDate = new Date(dateString);
    const now = new Date();
    const timeDiff = now - updatedDate; // en millisecondes
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
  };

  useEffect(() => {
    if (!username) {
      setInfo(null);
      setRepos([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    Promise.all([
      axios.get(`https://api.github.com/users/${username}`),
      axios.get(`https://api.github.com/users/${username}/repos`)
    ])
      .then(([userResponse, reposResponse]) => {
        setInfo(userResponse.data);
        setRepos(reposResponse.data);
      })
      .catch((err) => {
        setError(
          err.response?.data?.message || err.message || "An error occurred"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [username]);

  // Réinitialisation dès qu'on modifie le champ de recherche
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setExpanded(false);
    setShowAll(false);
  };

  // Lorsqu'on appuie sur "Entrée", si des infos existent, on affiche le détail
  const handleEnter = () => {
    if (info) {
      setExpanded(true);
    }
  };

  return (
    <div
      className="app-container"
      style={{ padding: "20px", fontFamily: "sans-serif" }}
    >
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <SearchInput
        username={username}
        onUsernameChange={handleUsernameChange}
        onEnter={handleEnter}
      />

      {isLoading && <p>Loading data...</p>}

      {/* Vue preview : affichée si info est présente et si le mode détaillé n'est pas activé */}
      {info && !isLoading && !expanded && (
        <ProfilePreview info={info} onClick={() => setExpanded(true)} />
      )}

      {/* Vue détaillée : affichée soit par clic sur le preview, soit en appuyant sur "Entrée" */}
      {expanded && info && !isLoading && (
        <>
          <ProfileDetails info={info} />
          <RepoList
            repos={repos}
            showAll={showAll}
            getDaysElapsed={getDaysElapsed}
            onViewAll={() => setShowAll(true)}
          />
        </>
      )}
    </div>
  );
}

export default App;
