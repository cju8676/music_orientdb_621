import { React, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Container, Grid, Paper } from '@mui/material';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function Song({ song }) {
  return (
    <Paper sx={{ height: '100%' }}>
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
    </Paper>
  );
}