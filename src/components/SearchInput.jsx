// src/components/SearchInput.js
import React from "react";

const SearchInput = ({ username, onUsernameChange, onEnter }) => {
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
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchInput;
