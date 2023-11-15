import { React, useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { Box, Card, CardContent, Container, Grid, IconButton, Paper, Typography, CardMedia, Button } from '@mui/material';

export default function Profile() {
    const { currentUser } = useContext(UserContext);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        getFriends();
    }, []);

    function logout() {
        localStorage.removeItem('user');
        window.location.reload();
    }

    function getFriends() {
        fetch('/friends/' + currentUser.username)
            .then(response => response.json())
            .then(data => setFriends(data));
    }

    return (
        <div>
            <Container>
                <Paper sx={{ height: '50%', width: '100%' }}>
                    <h1>Profile</h1>
                    <Grid container spacing={0} direction="row" alignItems="center" justifyContent="center">
                        <Grid item xs={3}>
                            <Box component='img' src={"https://robohash.org/" + currentUser?.username} sx={{ width: 100, height: 100, border: '1px solid black', borderRadius: '10px' }} />
                        </Grid>
                        <Grid item xs={3}>
                            <h2>{currentUser?.username}</h2>
                            <h3>{currentUser?.first_name} {currentUser?.last_name}</h3>
                            <h3>{currentUser?.email}</h3>
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
                        </Grid>
                    </Grid>

                </Paper>
            </Container>
            <Container>
                <h1>Friends</h1>
                <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center">
                {friends && friends.map(friend => {
                    return (
                        <Grid item xs={3}>
                            <Card sx={{ display: 'flex' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography component="div" variant="h5">
                                            {friend.first_name} {friend.last_name}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            {friend.username}
                                        </Typography>
                                    </CardContent>
                                </Box>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 151 }}
                                    image={"https://robohash.org/" + friend.username}
                                    alt="Live from space album cover"
                                />
                            </Card>
                        </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}