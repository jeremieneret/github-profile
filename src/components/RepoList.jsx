import RepoItem from "./RepoItem";

const RepoList = ({ repos, showAll, getDaysElapsed, onViewAll }) => {
  const reposToDisplay = showAll ? repos : repos.slice(0, 4);

  return (
    <div className="repo-list">
      {repos && repos.length > 0 ? (
        <>
          {reposToDisplay.map((repo) => (
            <RepoItem key={repo.id} repo={repo} getDaysElapsed={getDaysElapsed} />
          ))}
          {!showAll && repos.length > 4 && (
            <button onClick={onViewAll}>
              View all repositories
            </button>
          )}
        </>
      ) : (
        <p>No repositories available.</p>
      )}
    </div>
  );
};

export default RepoList;
