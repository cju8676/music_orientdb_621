import { React, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { SvgIcon } from "@mui/material";
import Search from "./SearchBar";
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { useNavigate } from "react-router-dom";

const pages = ["Home", "Games", "Players", "Stats"];
const settings = ["Profile", "Logout"];

export default function NavBar() {
    let navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState("Corey2");
    const [currentUserID, setCurrentUserID] = useState("#50:83");
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
        // setAnchorElNav(null);
    };

    const goToPage = (event) => {
        console.log("EVENT", event.target.options)
        switch(event.target.innerText.toLowerCase()) {
            case "home":
                return "/";
            case "search":
                return "/search";
            case "library":
                return "/library";
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
                        <Button variant="raised" color="primary" className="nav-button" key="home" onClick={handleCloseNavMenu}>
                                <HomeIcon />
                            Home
                        </Button>
                        <Button variant="raised" color="primary" className="nav-button" key="search"onClick={handleCloseNavMenu}>
                                <SearchIcon />
                            Search
                        </Button>
                        <Button variant="raised" color="primary" className="nav-button" key="library" onClick={handleCloseNavMenu}>
                                <LibraryMusicIcon />
                            Library
                        </Button>
                    </Box>
                    <Button variant="raised" color="primary" className="nav-button" key="profile"onClick={handleCloseNavMenu}>
                        <Avatar
                            src={"https://robohash.org/" + currentUser}
                            alt={currentUser}
                            // sx={{ width: 48, height: 48 }}
                        />
                        {currentUser}
                    </Button>
                    {/* <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Profile">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    src={"https://robohash.org/" + currentUser}
                                    alt={currentUser}
                                    sx={{ width: 48, height: 48 }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting}
                                    onClick={handleCloseUserMenu}
                                >
                                    <Typography textAlign="center">
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box> */}
                </Toolbar>
            </Container>
        </AppBar>
    );
}