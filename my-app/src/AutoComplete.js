import React, { useState, useEffect } from 'react';
import './AutoComplete.css';

function AutoComplete() {

  function toNormalForm(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  }

  function fetchFoods(userInput) {
    const url = `https://api.zachmig.com:8443/food?name=${userInput}`;
    const resultsContainer = document.getElementById("results-container") 
    if (resultsContainer != null) {
      resultsContainer.innerHTML = '';
    }
    if (normalizedSuggestions.includes(toNormalForm(userInput))) {
      console.log("Matching food found, running API query on url:" + url);
      fetch(url)
      .then(res => res.json())
      .then(data => {
        data.sort().forEach((item) => {
          const element = document.createElement("div");
          element.classList.add("item");
          element.textContent = item;
          //element.addEventListener('onclick', populateInput(item));
          resultsContainer.appendChild(element);
        })
      });
    } else {
      console.log("Non-matching input: " + userInput);
    }
  }

  const [suggestions, setSuggestions] = useState([]);
  const [normalizedSuggestions, setNormalizedSuggestions] = useState([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    fetch('https://api.zachmig.com:8443/foods')
      .then(response => response.json())
      .then(apiSuggestions => {
        setSuggestions(apiSuggestions.sort());
      })
      .catch(error => {
        console.error('Error while fetching food list.', error);
      });
  }, []);

  useEffect(() => {
    //Chain once when the prior useEffect runs, to populate normalized array to reduce number of api calls
    setNormalizedSuggestions(suggestions.map((food) => toNormalForm(food)));
  }, [suggestions]);

  useEffect(() => {
    fetchFoods(userInput);
  }, [userInput]);

  const handleInputChange = event => {
    setUserInput(event.target.value);
  };

  //Stop website from reload on enter key press
  const handleKeyDown = event => {
    /*if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedIndex(prevIndex =>
        Math.min(prevIndex + 1, suggestions.length - 1)
      );
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex(prevIndex => Math.max(prevIndex - 1, -1));
    } else */if (event.key === 'Enter') {
      event.preventDefault();
      //if (highlightedIndex >= 0) {
      //  setUserInput(suggestions[highlightedIndex]);
      //  setHighlightedIndex(-1);
      //}
    }
  };

  //Populate the text input field if user clicks an autocomplete suggestion
  const populateInput = food => {
    setUserInput(food);
  };

  const filteredSuggestions = suggestions.filter(suggestion =>
    toNormalForm(suggestion).toLowerCase().includes(toNormalForm(userInput).toLowerCase())
  );

  return (
    <>
      <div className="autocomplete">
        <h2 className="section-title">food pairings</h2>
        <div className="dropdown-wrapper">
          <form>
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="food to pair"
              id="food-input"
            />
            
          </form>
          {userInput && (
            <ul className="suggestions">
              {filteredSuggestions.map((suggestion, index) => (
                <li key={index} onClick={() => populateInput(suggestion)}>{suggestion}</li>
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
