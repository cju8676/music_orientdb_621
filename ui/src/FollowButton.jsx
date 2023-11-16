import { Button } from '@mui/material';
import { React, useContext } from 'react';
import { UserContext } from './UserContext';

export default function FollowButton({ user, setUser }) {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    function getUser() {
        fetch('/user/' + encodeURIComponent(user['@rid']))
            .then(response => response.json())
            .then(data => setUser(data[0]));
    }

    const unfollowUser = () => {
        fetch('/unFriend/' + encodeURIComponent(currentUser['username']) + '/' + encodeURIComponent(user['username']), {
            method: 'POST'
        }).then(res => res.json())
        .then(data => {
            getUser();
            // this is bad but it somehow works
            fetch('/user/' + encodeURIComponent(currentUser['@rid']))
                .then(response => response.json())
                .then(data => setCurrentUser(data[0]));
        });
    }

    const followUser = () => {
        fetch('/addFriend/' + encodeURIComponent(currentUser['username']) + '/' + encodeURIComponent(user['username']), {
            method: 'POST'
        }).then(res => res.json())
        .then(data => {
            getUser();
            // this is bad but it somehow works
            fetch('/user/' + encodeURIComponent(currentUser['@rid']))
                .then(response => response.json())
                .then(data => setCurrentUser(data[0]));
        });
    }

    return (

        currentUser['@rid'] !== user['@rid'] &&
            currentUser?.out_Friends?.delegate.entries.some(f => user?.in_Friends?.delegate.entries.includes(f)) ?
            <Button variant="contained" color="error" onClick={unfollowUser}>Unfollow</Button> :
            <Button variant="contained" color="success" onClick={followUser}>Follow</Button>

    );
}