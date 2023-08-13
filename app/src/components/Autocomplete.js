import React, { useState, useEffect } from 'react';

function AutoComplete() {
  const [suggestions, setSuggestions] = useState([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    // Fetch suggestions on component mount
    fetch('http://localhost:8080/foods')
      .then(response => response.json())
      .then(apiSuggestions => {
        setSuggestions(apiSuggestions);
      })
      .catch(error => {
        console.error('Error fetching suggestions:', error);
      });
  }, []);

  const handleInputChange = event => {
    setUserInput(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Start typing..."
      />
      <ul>
        {suggestions
          .filter(suggestion => suggestion.includes(userInput))
          .map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
      </ul>
    </div>
  );
}

export default AutoComplete;
