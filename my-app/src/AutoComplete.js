import React, { useState, useEffect } from 'react';
import './AutoComplete.css';

function AutoComplete() {

  function toNormalForm(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const [suggestions, setSuggestions] = useState([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    // Fetch suggestions on component mount
    fetch('http://localhost:8080/foods')
      .then(response => response.json())
      .then(apiSuggestions => {
        setSuggestions(apiSuggestions.sort());
      })
      .catch(error => {
        console.error('Error fetching suggestions:', error);
      });
  }, []);

  const handleInputChange = event => {
    setUserInput(event.target.value);
  };

  const filteredSuggestions = suggestions.filter(suggestion =>
    toNormalForm(suggestion).toLowerCase().includes(toNormalForm(userInput).toLowerCase())
  );

  return (
    <>
      <div className="autocomplete">
        <h2 className="section-title">food pairings</h2>
        <div className="dropdown-wrapper">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="food to pair"
            id="food-input"
          />
          {userInput && (
            <ul className="suggestions">
              {filteredSuggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="section-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
    </>
  );
}

export default AutoComplete;
