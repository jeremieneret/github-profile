import Search from '/assets/Search.svg'

const SearchInput = ({ username, onUsernameChange, onEnter }) => {
  // Detects when the user presses "Enter" in the input field
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onEnter(); // Calls the function to fetch data and show the dropdown
    }
  };

  return (
    <div className="search-input">
      <div className="img-container">
        <img src={Search} alt="" />
      </div>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={onUsernameChange} // Updates the username state
        onKeyDown={handleKeyDown} // Listens for the "Enter" key press
      />
    </div>
  );
};

export default SearchInput;
