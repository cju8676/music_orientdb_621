import { React, useState } from 'react';
import { HashRouter, Route, Routes, useParams, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Search from './pages/Search';
import SongPage from './pages/SongPage';
import NavBar from './NavBar';
import Library from './pages/Library';
import { Theme } from './extras/Theme';
import { UserContext } from './UserContext';


export default function PageHandle() {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    const SongWrapper = () => {
        const { rid } = useParams();
        return <SongPage rid={rid} />;
    }

    function handleUserChange(user) {
        setCurrentUser(user)
        localStorage.setItem('user', JSON.stringify(user));
    }

    return (
        <Theme>
            <UserContext.Provider value={{ currentUser, setCurrentUser }}>
                <HashRouter>
                    {currentUser && <NavBar />}
                        <Routes>
                            <Route path="/" element={currentUser ? <Home /> : <Login onChange={handleUserChange}/>} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/profile" element={currentUser ? <Profile /> : <Login onChange={handleUserChange}/>} />
                            <Route path="/search" element={currentUser ? <Search /> : <Login onChange={handleUserChange}/>} />
                            <Route path="/song/:rid" element={currentUser ? <SongWrapper /> : <Login onChange={handleUserChange}/>} />
                            <Route path="/library" element={currentUser ? <Library /> : <Login onChange={handleUserChange}/>} />
                            <Route
                                path="*"
                                element={<Navigate to="/" replace />}
                            />
                        </Routes>
                </HashRouter>
            </UserContext.Provider>
        </Theme>
    );
}