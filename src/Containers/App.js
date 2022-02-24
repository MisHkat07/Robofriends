import React, { useState, useEffect } from 'react';
import CardList from '../Components/CardList';
import Scroll from '../Components/Scroll';
import ErrorBoundary from '../Components/ErrorBoundary';
import SearchBar from '../Components/SearchBar';
import './App.css';

function App() {
  
  const [robots, setRobots] = useState([]);
  const [searchBox, setSearchBox] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setRobots(users));
  }, []);
  const onSearchChange = (event) => {
    setSearchBox(event.target.value);
  };

    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchBox.toLowerCase());
    });
    return !robots.length ? (
      <h1> loading... </h1>
    ) : (
      <div className="tc">
        <h1 className="f1 pa2 ma2 tc">robofriends</h1>
        <SearchBar searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredRobots} />
          </ErrorBoundary>
        </Scroll>
      </div>
    );
  
}

export default App;
