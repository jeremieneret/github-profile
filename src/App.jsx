import { useState, useEffect } from 'react';
import axios from 'axios';
import './style/CSS/style.css'

function App() {
  // Modifier l'état initial pour info et repos
  const [info, setInfo] = useState({});
  const [error, setError] = useState(null);
  const [repos, setRepos] = useState([]); // initialisé en tableau

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/users/github"
        );
        setInfo(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchData2 = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/users/github/repos"
        );
        setRepos(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
    fetchData2();
  }, []);

  return (
    <>
      {error && <p>Error: {error}</p>}
      <input type="text" placeholder="username" />
      <div>
        <img src={info.avatar_url} alt="Avatar" />
        <div>
          <p>Followers</p>
          <p>{info.followers}</p>
        </div>
        <div>
          <p>Following</p>
          <p>{info.following}</p>
        </div>
        <div>
          <p>Location</p>
          <p>{info.location}</p>
        </div>
      </div>
      <div>
        <h1>{info.name}</h1>
        <p>{info.bio}</p>
      </div>
      <div>
        {/* Afficher les 4 premiers repos */}
        {repos.slice(0, 4).map((repo) => (
          <div key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              <h3>{repo.name}</h3>
              <p>{repo.description}</p>
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
