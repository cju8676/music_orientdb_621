import '../App.css';
import {React, useState, useEffect} from 'react';
import Song from '../Song';
import User from '../User';
import SimilarSong from '../SimilarSong';
import Search from '../SearchBar';
import { Container, Grid, Paper } from '@mui/material';
import { SongContext } from '../SongContext';
import MiniUserCard from '../MiniUserCard';

export default function SongPage({ rid }) {
  const [likes, setLikes] = useState([]);
  const [song, setSong] = useState({
    title: "",
    artist: "",
    album: "",
    year: "",
  });

  useEffect(() => {
    fetch("/song/likes/" + encodeURIComponent(rid))
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0)
          setLikes(data);
      });
  }, []);

  function getSong() {
    fetch('/song/' + encodeURIComponent(rid))
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
          <Container sx={{ width: '50%'}}>
            {/* Right side: Two Lists */}
            <Container className='list'>
              <h3>Liked By</h3>
              <Paper className='list-paper'>
                <Grid container spacing={2} direction="row" alignItems="left" justifyContent="flex-start" sx={{height:'fit-content'}}>
                  {likes && likes.filter((item, idx) => idx < 12).map(user => {
                    return <Grid item><MiniUserCard key={user['@rid']} user={user} /></Grid>;
                  })}
                </Grid>
              </Paper>
            </Container>
            <Container className='list'>
              <h3>Similar Songs</h3>
              <Paper className='list-paper'>
                <SimilarSong />
                <SimilarSong />
                <SimilarSong />
              </Paper>
            </Container>
          </Container>
        </div>
      </SongContext.Provider>
    </div>
  );
}
