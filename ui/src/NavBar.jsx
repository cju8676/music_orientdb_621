import { React, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function NavBar() {
    const { currentUser } = useContext(UserContext);
    let navigate = useNavigate();

    const handleCloseNavMenu = (event) => {
        navigate(goToPage(event));
    };

    const goToPage = (event) => {
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
        <AppBar position="sticky" sx={{borderBottom: 1, borderColor: '#F05454'}}/*sx={{ background: '#F5F5F5', color: '#F05454' }}*/>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{justifyContent: 'space-between'}}>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Tuned In
                    </Typography>
                    <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
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
                        <Button variant="raised" color="primary" className="nav-button" id="profile"onClick={handleCloseNavMenu}>
                            <Avatar
                                src={"https://robohash.org/" + currentUser?.username}
                                alt={currentUser?.username}
                                // sx={{ width: 48, height: 48 }}
                            />
                            {currentUser?.username}
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}