import { React } from "react";
import { Avatar, Box, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SimilarSong({ song }) {
    let navigate = useNavigate();

    const goToSong = (rid) => {
        navigate('/song/' + encodeURIComponent(rid));
    }

    return (
        <Box key={0} p={1} onClick={() => goToSong(song['@rid'])}>
            <Card sx={{
                border: '1px solid white',
                "&:hover": {
                    border: '1px solid #F05454',
                    cursor: "pointer",
                    "& .addIcon": {
                        color: "purple"
                    }
                }
            }}>
                <Box sx={{ display: "flex", justifyContent: "space-between"}}>
                <Box sx={{ p: 2, display: "flex" }}>
                    <Avatar variant="rounded" src={process.env.PUBLIC_URL + '/music.png'} sx={{ width: 56, height: 56}}/>
                    <Box sx={{ ml: 2, alignItems: "center" }}>
                        <Typography fontWeight={700} >
                            {song.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {song.artist}
                        </Typography>
                    </Box>
                </Box>
                </Box>
            </Card>
        </Box>
    );
}