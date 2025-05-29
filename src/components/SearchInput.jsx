const SearchInput = ({ username, onUsernameChange, onEnter }) => {
  // Detects when the user presses "Enter" in the input field
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onEnter();
    }
  };

  return (
    <div className="search-input">
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={onUsernameChange}
        onKeyDown={handleKeyDown} // Attaches key event listener
      />
    </div>
  );
};

export default SearchInput;
