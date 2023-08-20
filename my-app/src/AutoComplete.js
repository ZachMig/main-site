import React, { useState, useEffect } from 'react';
import './AutoComplete.css';

function AutoComplete() {
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
    suggestion.includes(userInput)
  );

  return (
    <>
      <div className="autocomplete">
        <h2 className="section-title">food pairings</h2>
        <div>
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
      <p className="section-text">
        TESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTEST
      </p>
    </>
  );
}

export default AutoComplete;
