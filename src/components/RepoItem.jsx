import Nesting from '../../public/assets/Nesting.svg'
import Star from '../../public/assets/Star.svg'

const RepoItem = ({ repo, getDaysElapsed }) => {
  return (
    <div className="repo-item">
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" >
        <h3>{repo.name}</h3> {/* Repository name */}
        <p>{repo.description ? repo.description : "No description available."}</p> {/* Description */}
        <div>
          <img src={Nesting} alt="nesting" />
          <p>{repo.forks_count}</p> {/* Number of forks */}
          <img src={Star} alt="star" />
          <p>{repo.stargazers_count}</p> {/* Number of stars */}
          <p className='update'>Updated {getDaysElapsed(repo.updated_at)} days ago</p> {/* Days since last update */}
        </div>
      </a>
    </div>
  );
};

export default RepoItem;
