import { React, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import LikeButton from './LikeButton';

export default function SongCard(props) {
    const [song, setSong] = useState(props.song);
    let navigate = useNavigate();

    const goToSong = () => {
        navigate('/song/' + encodeURIComponent(song['@rid']));
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={process.env.PUBLIC_URL + '/music.png'}
            title="Song"
          />
          <CardContent sx={{height: '130px'}}>
            <Typography gutterBottom variant="h5" component="div">
              {song.title}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {song.artist}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {song.album}<br/>
              {song.year}
            </Typography>
          </CardContent>
          <CardActions sx={{justifyContent: 'space-between'}}>
            <Button size="small" color='secondary' onClick={goToSong}>View</Button>
            <LikeButton song={song} setSong={setSong} />
          </CardActions>
        </Card>
      );
}