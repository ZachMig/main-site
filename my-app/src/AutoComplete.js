import React, { useState, useEffect } from 'react';
import './AutoComplete.css';

function AutoComplete() {

  function toNormalForm(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const handleSubmit = event => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Handle the submission logic here
    console.log('Submitted:', userInput);


  };


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

  const handleSuggestionClick = suggestion => {
    setUserInput(suggestion);
  };

  const filteredSuggestions = suggestions.filter(suggestion =>
    toNormalForm(suggestion).toLowerCase().includes(toNormalForm(userInput).toLowerCase())
  );

  return (
    <>
      <div className="autocomplete">
        <h2 className="section-title">food pairings</h2>
        <div className="dropdown-wrapper">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              placeholder="food to pair"
              id="food-input"
            />
            <input id="food-button" className="custom-input" type="submit" value="Submit"/>
          </form>
          {userInput && (
            <ul className="suggestions">
              {filteredSuggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleSuggestionClick(suggestion)}>{suggestion}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div id="results-container" className="section-text">
        
      </div>
    </>
  );
}

export default AutoComplete;
