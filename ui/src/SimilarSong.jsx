import { React } from "react";
import { Avatar, Box, Card, Typography } from "@mui/material";

export default function SimilarSong() {

    return (
        <Box key={0} p={1}>
            <Card>
                <Box sx={{ display: "flex", justifyContent: "space-between"}}>

                <Box sx={{ p: 2, display: "flex" }}>
                    <Avatar variant="rounded" sx={{ width: 56, height: 56}}/>
                    <Box sx={{ ml: 2, alignItems: "center" }}>
                        <Typography fontWeight={700} >
                            Song Title
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            The Artist
                        </Typography>
                    </Box>
                </Box>
                </Box>
            </Card>
        </Box>
    );
}