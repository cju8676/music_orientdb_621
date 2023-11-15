import { Avatar, Button } from '@mui/material';
import { React } from 'react';
import { useNavigate } from 'react-router-dom';


export default function MiniUserCard({ user }) {
    let navigate = useNavigate();

    const goToUserProfile = () => {
        navigate('/profile/' + encodeURIComponent(user['@rid']));
    }

    return (
        <Button variant="raised" color="primary" className="nav-button" id="profile"onClick={goToUserProfile}>
            <Avatar
                src={"https://robohash.org/" + user?.username}
                alt={user?.username}
                // sx={{ width: 48, height: 48 }}
            />
            {user?.username}<br/>
            {"Friends"}
        </Button>
    )
}