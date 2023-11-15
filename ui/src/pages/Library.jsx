import { React, useContext, useState, useEffect } from 'react';
import { UserContext } from '../UserContext';
import { Container, Paper, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SongCard from '../SongCard';
import Header from '../Header';


export default function Library() {
    const { currentUser } = useContext(UserContext);
    const [likes, setLikes] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        fetch("/likes/" + currentUser.username)
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0)
                    setLikes(data);
            });
    }, []);

    const goToSongPage = (rid) => {
        navigate('/song/' + encodeURIComponent(rid));
    }

    return (
        <div>
            <Header text="Library" />
            <Container>
                <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center">
                    {likes && likes.map(like => {
                        return (
                            <Grid item xs={6} md={3}>
                                <SongCard song={like} onClick={() => goToSongPage(like['@rid'])} />
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}