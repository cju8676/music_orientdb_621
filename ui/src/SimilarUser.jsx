import { React } from "react";
import { Avatar, Box, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FollowButton from "./FollowButton";

export default function SimilarUser({ user, setUser }) {
    let navigate = useNavigate();

    const goToUser = (rid) => {
        navigate('/profile/' + encodeURIComponent(rid));
    }

    return (
        <Box key={0} p={1} onClick={() => goToUser(user['@rid'])}>
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
                        <Avatar variant="rounded" src={"https://robohash.org/" + user?.username} sx={{ width: 56, height: 56}}/>
                        <Box sx={{ ml: 2, alignItems: "center" }}>
                            <Typography fontWeight={700} >
                                {user.username}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                {user.first_name} {user.last_name}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{p:2, pt:3}}>
                        <FollowButton user={user} setUser={setUser} />
                    </Box>
                </Box>
            </Card>
        </Box>
    );
}