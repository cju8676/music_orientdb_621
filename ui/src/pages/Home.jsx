import { React, useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { Container, Paper, Grid, Box, Card, CardContent, Typography } from '@mui/material';



export default function Home() {
    const { currentUser } = useContext(UserContext);
    const [recommendedSongs, setRecommendedSongs] = useState([]);
    const [recommendedFriends, setRecommendedFriends] = useState([]);

    useEffect(() => {
        getRecommendedSongs();
        getRecommendedFriends();
    }, []);

    function getRecommendedSongs() {
        console.log(currentUser['@rid'])
        fetch("/recommendSongs/" + encodeURIComponent(currentUser['@rid']))
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0)
                    setRecommendedSongs(data);
            });
    }

    function getRecommendedFriends() {
        fetch("/recommendFriends/" + encodeURIComponent(currentUser['@rid']))
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0)
                    setRecommendedFriends(data);
            });
    }


    return (
        <div>
            <h1>Home</h1>
            <Container>
                <h2>Discover New Songs</h2>
                <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center">
                    {recommendedSongs && recommendedSongs.map(song => {
                        return (
                            <Grid item xs={3}>
                                <Card sx={{ display: 'flex' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography component="div" variant="h5">
                                                {song.title}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                {song.artist}
                                            </Typography>
                                        </CardContent>
                                    </Box>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
                <h2>Meet Friends with Similar Music Interests!</h2>
                <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center">
                    {recommendedFriends && recommendedFriends.map(friend => {
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
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}