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

export default function SongCard({ song }) {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [isLikedByUser, setIsLikedByUser] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        setIsLikedByUser(currentUser.out_Likes.delegate.entries
            .some(
                like => song.in_Likes.delegate.entries.includes(like)
            ));
    
    }, [])

    const goToSong = () => {
        navigate('/song/' + encodeURIComponent(song['@rid']));
    }
    
    const removeCurrentUserLike = () => {
        setCurrentUser(prevState => {
            return {
                ...prevState,
                out_Likes: {
                    ...prevState.outLikes,
                    delegate: {
                        ...prevState.out_Likes.delegate,
                        entries: prevState.out_Likes.delegate.entries.filter(like => like['@rid'] !== song['@rid'])
                    }
                }
            }
        });
        setIsLikedByUser(false);
    }

    const addCurrentUserLike = (rid) => {
        setCurrentUser(prevState => {
            return {
                ...prevState,
                out_Likes: {
                    ...prevState.outLikes,
                    delegate: {
                        ...prevState.out_Likes.delegate,
                        entries: [...prevState.out_Likes.delegate.entries, rid]
                    }
                }
            }
        });
        setIsLikedByUser(true);
    }
    
    // currentUser either likes or chooses to remove from likes
    const likeOrUnLikeSong = () => {
        if (isLikedByUser) {
            fetch('/unlike/' + encodeURIComponent(currentUser['username']) + '/' + encodeURIComponent(song['@rid']), {
                method: 'POST'
            }).then(res => res.json())
            .then(data => {
                console.log(data);
                removeCurrentUserLike(data[0]['@rid']);
            });
        } else {
            fetch('/likeSong/' + encodeURIComponent(currentUser['username']) + '/' + encodeURIComponent(song['@rid']), {
                method: 'POST'
            }).then(res => res.json())
            .then(data => {
                console.log(data);
                addCurrentUserLike(data[0]['@rid']);
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