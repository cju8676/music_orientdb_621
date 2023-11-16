import { React, useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function LikeButton({ song, setSong }) {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [isLikedByUser, setIsLikedByUser] = useState(false);

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

    useEffect(() => {
        setIsLikedByUser(currentUser?.out_Likes?.delegate.entries
            .some(
                like => song?.in_Likes?.delegate.entries.includes(like)
            ));
    
    }, [song, currentUser]);

    return (
        <IconButton size="small" color='secondary' onClick={likeOrUnLikeSong}>
            {isLikedByUser ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
    );
}