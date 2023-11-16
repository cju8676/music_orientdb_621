import { React } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid, Paper } from '@mui/material';
import LikeButton from './LikeButton';

export default function Song({ song, setSong }) {
  return (
    <Paper sx={{ height: '100%', border: 1, borderColor: '#F05454' }}>
      <Typography gutterBottom className='song-text'>
        Song
      </Typography>
      <Typography variant="h4" className='song-text'>
        {song.title}
      </Typography>
      <Typography sx={{ mb: 1.5 }} variant="h5" className="song-text" color="text.secondary">
        {song.artist}
      </Typography>
      <Typography variant="body2" className='song-text'>
        {song.album}
      </Typography>
      <Typography variant="body2" className='song-text'>
        {song.year}
      </Typography>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={3}>
          <Box component='img' src={process.env.PUBLIC_URL + '/music.png'} sx={{ width: 250, height: 250, border: '1px solid black', borderRadius: '10px' }} />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={3}>
          <LikeButton song={song} setSong={setSong} />
        </Grid>
      </Grid>

    </Paper>
  );
}