import { React } from 'react';
import SearchBar from '../SearchBar';
import { Box } from '@mui/material';

export default function Search() {
        return (
            <div>
                <h1>Search</h1>
                
                <Box sx={{ flexGrow: 1 }}>
                    <SearchBar />
                </Box>
            </div>
        );
    }