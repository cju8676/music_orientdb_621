import { React } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function SongCard({ song }) {
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
          <CardContent>
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
          <CardActions>
            <Button size="small" color='secondary' onClick={goToSong}>View</Button>
            <Button size="small" color='secondary'>Like</Button>
          </CardActions>
        </Card>
      );
}