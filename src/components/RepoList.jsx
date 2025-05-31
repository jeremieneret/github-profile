import RepoItem from "./RepoItem";

const RepoList = ({ repos, showAll, getDaysElapsed, onViewAll }) => {
  const reposToDisplay = showAll ? repos : repos.slice(0, 4);

  return (
    <>
      <div className="repo-list">
        {repos && repos.length > 0 ? (
          <>
            {reposToDisplay.map((repo) => (
              <RepoItem key={repo.id} repo={repo} getDaysElapsed={getDaysElapsed} />
            ))}
          </>
        ) : (
          <p>No repositories available.</p>
        )}

      </div>
      {/* Button placed outside the repository list for better styling */}
      {!showAll && repos.length > 4 && (
        <div className="button-container">
          <button onClick={onViewAll}>View all repositories</button>
        </div>
      )}
    </>
  );
};

export default RepoList;
