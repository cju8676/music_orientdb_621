import { React } from "react";
import { Avatar, Box, Card, Typography } from "@mui/material";

export default function Players() {

    return (
        <Box key={0} p={1}>
            <Card>
                <Box sx={{ display: "flex", justifyContent: "space-between"}}>

                <Box sx={{ p: 2, display: "flex" }}>
                    <Avatar variant="rounded" src={process.env.PUBLIC_URL + '/music.png'} sx={{ width: 56, height: 56}}/>
                    <Box sx={{ ml: 2, alignItems: "center" }}>
                        <Typography fontWeight={700} >
                            Corey Urbanke
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            corey2username
                        </Typography>
                    </Box>
                </Box>
                    <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
                        <Typography fontWeight={700} >
                            Mutual Friends
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
}