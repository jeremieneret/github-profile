const SearchInput = ({ username, onUsernameChange, onEnter }) => {
  // Detects when the user presses "Enter" in the input field
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onEnter(); // Calls the function to fetch data and show the dropdown
    }
  };

  return (
    <div className="search-input">
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={onUsernameChange} // Updates the username state
        onKeyDown={handleKeyDown} // Listens for the "Enter" key press
      />
    </div>
  );
};

export default SearchInput;
