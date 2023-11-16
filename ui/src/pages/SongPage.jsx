import '../App.css';
import {React, useState, useEffect} from 'react';
import Song from '../Song';
import SimilarSong from '../SimilarSong';
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
  const [similarSongs, setSimilarSongs] = useState([]);

  useEffect(() => {
    fetch("/song/likes/" + encodeURIComponent(rid))
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0)
          setLikes(data);
      });
  }, [rid]);

  function getSong() {
    fetch('/song/' + encodeURIComponent(rid))
      .then(response => response.json())
      .then(data => setSong(data[0]));
  }

  function getSimilarSongs() {
    fetch('/songRec/' + encodeURIComponent(rid))
      .then(response => response.json())
      .then(data => setSimilarSongs(data.filter((item, idx) => item['@rid'] !== rid)));
  }

  useEffect(() => {
    getSong();
    getSimilarSongs();
  }, [rid]);

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
              <h3>Liked By:</h3>
              <Paper className='list-paper'>
                <Grid container spacing={2} direction="row" alignItems="left" justifyContent="flex-start" sx={{height:'fit-content'}}>
                  {likes && likes.filter((item, idx) => idx < 12).map(user => {
                    return <Grid item><MiniUserCard key={user['@rid']} user={user} /></Grid>;
                  })}
                </Grid>
              </Paper>
            </Container>
            <Container className='list'>
              <h3>Users Also Liked These Songs:</h3>
              <Paper className='list-paper'>
                  {similarSongs && similarSongs.filter((item, idx) => idx < 12).map(song => {
                    return <SimilarSong key={song['@rid']} song={song} />;
                  })}
              </Paper>
            </Container>
          </Container>
        </div>
      </SongContext.Provider>
    </div>
  );
}
