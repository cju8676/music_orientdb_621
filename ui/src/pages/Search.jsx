import { React } from 'react';
import SearchBar from '../SearchBar';
import { Box, Container, Paper } from '@mui/material';
import Header from '../Header';

export default function Search() {
        return (
            <div>
                <Header text="Search" />
                <Container>
                    <Paper sx={{px:2, py:1, mt:2, border:1, borderColor: '#F05454'}}>
                        <SearchBar />
                    </Paper>
                </Container>
            </div>
        );
    }