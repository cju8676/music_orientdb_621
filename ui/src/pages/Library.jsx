import { React, useContext, useState, useEffect } from 'react';
import { UserContext } from '../UserContext';
import { Container, Paper, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


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
    })

    const goToSongPage = (rid) => {
        navigate('/song/' + encodeURIComponent(rid));
    }

    return (
        <div>
            <h1>Library</h1>
            {likes && likes.map(like => {
                return (
                    <Container onClick={() => goToSongPage(like['@rid'])}>
                        <Paper sx={{ height: '50%', width: '100%', m:1 }}>
                            <Grid container spacing={0} direction="row" alignItems="center" justifyContent="center">
                                <Grid item xs={3}>
                                    <Box component='img' src={process.env.PUBLIC_URL + '/music.png'} sx={{ width: 100, height: 100, border: '1px solid black', borderRadius: '10px' }} />
                                </Grid>
                                <Grid item xs={3}>
                                    <h2>{like?.title}</h2>
                                    <h3>{like?.artist}</h3>
                                    <h3>{like?.album}</h3>
                                    <h3>{like?.year}</h3>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Container>
                )
            })}
        </div>
    );
}