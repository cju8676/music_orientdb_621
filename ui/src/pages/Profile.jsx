import { React, useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { Box,Container, Grid,Paper, Button } from '@mui/material';
import Header from '../Header';
import FriendCard from '../FriendCard';
import FollowButton from '../FollowButton';

export default function Profile({ rid }) {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [user, setUser] = useState({})
    const [follow, setFollow] = useState([]);
    
    useEffect(() => {
        getUser();
    }, [rid]);

    useEffect(() => {
        getFollow();
    }, [user]);

    function logout() {
        localStorage.removeItem('user');
        window.location.reload();
    }

    function getUser() {
        fetch('/user/' + encodeURIComponent(rid))
            .then(response => response.json())
            .then(data => setUser(data[0]));
    }

    function getFollow() {
        fetch(`/${currentUser.username === user.username ? 'friends' : 'following'}/` + encodeURIComponent(rid))
            .then(response => response.json())
            .then(data => setFollow(data));
    }

    return (
        <div>
            <Header text="Profile" />
            <Container>
                <Paper sx={{ height: '50%', width: '100%' }}>
                    <Grid container spacing={0} direction="row" alignItems="center" justifyContent="center">
                        <Grid item xs={3}>
                            <Box component='img' src={"https://robohash.org/" + user?.username} sx={{ width: 100, height: 100, border: '1px solid black', borderRadius: '10px' }} />
                        </Grid>
                        <Grid item xs={3}>
                            <h2>{user?.username}</h2>
                            <h3>{user?.first_name} {user?.last_name}</h3>
                            <h3>{user?.email}</h3>
                        </Grid>
                        <Grid item xs={3}>
                            {currentUser['@rid'] === user['@rid'] && <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>}
                            {currentUser['@rid'] !== user['@rid'] && <FollowButton user={user} setUser={setUser} />}
                        </Grid>
                    </Grid>

                </Paper>
            </Container>
            <Header text={currentUser['@rid'] === user['@rid'] ? "Users I am Following" : "Their Followers"} />
            <Container>
                <Grid container spacing={2} direction="row" justifyContent="flex-start">
                {follow && follow.map(friend => {
                    return (
                        <FriendCard user={friend} />
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}