import './App.css';
import {React, useState, useEffect} from 'react';
import Song from './Song';
import User from './User';
import SimilarSong from './SimilarSong';
import Search from './Search';
import { Paper } from '@mui/material';
import NavBar from './NavBar';

function App() {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    fetch("/onelikes")
      .then(res => res.json())
      .then(data => {
        setLikes(data);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <div className="info-page">
        <Paper className="info">
          <Song />
        </Paper>
        <div className="lists">
          {/* Right side: Two Lists */}
          <Paper className='list'>
            <h3>Liked By</h3>
            {likes.map(user => {
              return <User key={user['@rid']} user={user} />;
            })}
          </Paper>
          <Paper className="list">
            <h3>Similar Songs</h3>
            <SimilarSong />
            <SimilarSong />
            <SimilarSong />
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default App;
