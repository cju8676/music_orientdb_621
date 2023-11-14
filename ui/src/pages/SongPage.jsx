import '../App.css';
import {React, useState, useEffect} from 'react';
import Song from '../Song';
import User from '../User';
import SimilarSong from '../SimilarSong';
import Search from '../SearchBar';
import { Paper } from '@mui/material';
import { SongContext } from '../SongContext';

function App() {
  const [likes, setLikes] = useState([]);
  const [song, setSong] = useState({
    title: "",
    artist: "",
    album: "",
    year: "",
  });

  useEffect(() => {
    fetch("/onelikes")
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0)
          setLikes(data);
      });
  }, []);

  function getSong() {
    fetch('/onesong')
      .then(response => response.json())
      .then(data => setSong(data[0]));
  }

  useEffect(() => {
    getSong();
  }, []);

  return (
    <div>
      <SongContext.Provider value={{ song, setSong }}>
        <div className="info-page">
          <Paper className="info">
            <Song song={song}/>
          </Paper>
          <div className="lists">
            {/* Right side: Two Lists */}
            <Paper className='list'>
              <h3>Liked By</h3>
              {likes && likes.map(user => {
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
      </SongContext.Provider>
    </div>
  );
}

export default App;
