import { React, useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { SvgIcon } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function NavBar() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    let navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    function handleCloseUserMenu(event) {
        if (event.target.innerText === "Logout")
            setAnchorElUser(null);
    };

    const handleCloseNavMenu = (event) => {
        navigate(goToPage(event));
    };

    const goToPage = (event) => {
        console.log("EVENT", event.target.id)
        switch(event.target.id.toLowerCase()) {
            case "home":
                return "/";
            case "search":
                return "/search";
            case "library":
                return "/library";
            case "profile":
                return "/profile/" + encodeURIComponent(currentUser['@rid']);
            default:
                return "/";
        }
    }

    return (
        <AppBar position="sticky" /*sx={{ background: '#F5F5F5', color: '#F05454' }}*/>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <SvgIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            // letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Tuned In
                    </Typography>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Tuned In
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Button variant="raised" color="primary" className="nav-button" id="home" onClick={handleCloseNavMenu}>
                                <HomeIcon />
                            Home
                        </Button>
                        <Button variant="raised" color="primary" className="nav-button" id="search"onClick={handleCloseNavMenu}>
                                <SearchIcon />
                            Search
                        </Button>
                        <Button variant="raised" color="primary" className="nav-button" id="library" onClick={handleCloseNavMenu}>
                                <LibraryMusicIcon />
                            Library
                        </Button>
                    </Box>
                    <Button variant="raised" color="primary" className="nav-button" id="profile"onClick={handleCloseNavMenu}>
                        <Avatar
                            src={"https://robohash.org/" + currentUser?.username}
                            alt={currentUser?.username}
                            // sx={{ width: 48, height: 48 }}
                        />
                        {currentUser?.username}
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}