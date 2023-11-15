import { React } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

export default function FriendCard({ user }) {
    let navigate = useNavigate();

    const goToFriendPage = (id) => {
        navigate('/profile/' + encodeURIComponent(id));
    }

    return (
        <Grid item xs={3} onClick={() => goToFriendPage(user['@rid'])}>
            <Card sx={{
                display: 'flex',
                border: '1px solid white',
                "&:hover": {
                    border: '1px solid #F05454',
                    cursor: "pointer",
                    "& .addIcon": {
                        color: "purple"
                    }
                }
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            {user.first_name} {user.last_name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {user.username}
                        </Typography>
                    </CardContent>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={"https://robohash.org/" + user.username}
                    alt="Live from space album cover"
                />
            </Card>
        </Grid>
    );
}