import { React, useState } from 'react';
import SearchBar from '../SearchBar';
import { Box, Button, ButtonGroup, Container, Paper } from '@mui/material';
import Header from '../Header';
import SimilarSong from '../SimilarSong';
import SimilarUser from '../SimilarUser';

export default function Search() {
    const [searchType, setSearchType] = useState('songs');
    const [results, setResults] = useState([]);

    return (
        <div>
            <Header text="Search" />
            <Container>
                <Paper sx={{ px: 2, py: 1, mt: 2, border: 1, borderColor: '#F05454', height: '75vh' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p:1 }}>
                        <SearchBar searchType={searchType} setResults={setResults} />
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <Button 
                                variant={searchType === 'songs' ? 'contained' : 'outlined'} 
                                onClick={() => {setSearchType('songs');setResults([]);}}>
                                    Songs
                            </Button>
                            <Button 
                                variant={searchType === 'users' ? 'contained' : 'outlined'}
                                onClick={() => {setSearchType('users');setResults([]);}}>
                                    Users
                            </Button>
                        </ButtonGroup>
                    </Box>
                    <Box className='search-results'>
                        {searchType === 'songs' && results.map(song => <SimilarSong song={song} />)}
                        {searchType === 'users' && results.map(user => <SimilarUser user={user} />)}
                    </Box>
                </Paper>
            </Container>
        </div>
    );
}