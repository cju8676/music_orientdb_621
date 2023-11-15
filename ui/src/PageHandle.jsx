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


export default function PageHandle() {


    return (
        <Theme>
            <HashRouter>
                <NavBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/song" element={<SongPage />} />
                        <Route path="/library" element={<Library />} />
                        <Route
                            path="*"
                            element={<Navigate to="/" replace />}
                        />
                    </Routes>
            </HashRouter>
        </Theme>
    );
}