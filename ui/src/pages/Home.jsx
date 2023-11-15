import { React, useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { Container,Grid} from '@mui/material';
import SongCard from '../SongCard';
import FriendCard from '../FriendCard';
import Header from '../Header';



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
            <Header text="Home" />
            <Container>
                <h2>Discover New Songs!</h2>
                <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center">
                    {recommendedSongs && recommendedSongs.map(song => {
                        return (
                            <Grid item xs={6} md={3}>
                                <SongCard song={song} />
                            </Grid>
                        )
                    })}
                </Grid>
                <h2>Meet Friends with Similar Music Interests!</h2>
                <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center">
                    {recommendedFriends && recommendedFriends.map(friend => {
                        return (
                            <FriendCard user={friend} />
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}