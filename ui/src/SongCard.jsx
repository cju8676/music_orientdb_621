import { React, useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { UserContext } from './UserContext';
import { IconButton } from '@mui/material';

export default function SongCard(props) {
    const [song, setSong] = useState(props.song);
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [isLikedByUser, setIsLikedByUser] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        setIsLikedByUser(currentUser.out_Likes.delegate.entries
            .some(
                like => song.in_Likes.delegate.entries.includes(like)
            ));
    
    }, [song, currentUser]);

    const goToSong = () => {
        navigate('/song/' + encodeURIComponent(song['@rid']));
    }

    const refreshSong = () => {
        fetch('/song/' + encodeURIComponent(song['@rid']))
            .then(response => response.json())
            .then(data => setSong(data[0]));
    }

    const refreshUser = () => {
        fetch('/user/' + encodeURIComponent(currentUser['@rid']))
            .then(response => response.json())
            .then(data => setCurrentUser(data[0]));
    }

    
    // currentUser either likes or chooses to remove from likes
    const likeOrUnLikeSong = () => {
        if (isLikedByUser) {
            fetch('/unlike/' + encodeURIComponent(currentUser['username']) + '/' + encodeURIComponent(song['@rid']), {
                method: 'POST'
            }).then(res => res.json())
            .then(data => {
                console.log(data);
                // bad way to refresh both this song and the user unliking it
                refreshSong();
                refreshUser();
            });
        } else {
            fetch('/likeSong/' + encodeURIComponent(currentUser['username']) + '/' + encodeURIComponent(song['@rid']), {
                method: 'POST'
            }).then(res => res.json())
            .then(data => {
                console.log(data);
                // do the same bad thing here
                refreshSong();
                refreshUser();
            });
        }
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
            <IconButton size="small" color='secondary' onClick={likeOrUnLikeSong}>{isLikedByUser ? <FavoriteIcon /> : <FavoriteBorderIcon />}</IconButton>
          </CardActions>
        </Card>
      );
}