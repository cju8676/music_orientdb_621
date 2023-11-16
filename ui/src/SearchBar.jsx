import { React, useState, useContext } from 'react';
import { SongContext } from './SongContext';
import Paper from '@mui/material/Paper';
import { Autocomplete, Box, Container, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Search({ searchType, setResults }) {
    const [searchValue, setSearchValue] = useState('');
    const [options, setOptions] = useState([]);

    const getData = (searchTerm) => {
        fetch("/songs/" + searchTerm, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                console.log(
                    "search term: " + searchTerm + ", results: ",
                    myJson
                );
                const updatedOptions = myJson.map((p) => {
                    return { title: p.title };
                });
                setOptions(updatedOptions);
            });
    };

    const searchForValue = () => {
        fetch(`/${searchType}/` + searchValue, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                console.log(
                    "search term: " + searchValue + ", results: ",
                    myJson
                );
                setResults(myJson);
            });
    };

    const onInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <Box sx={{ display: 'flex', width: '33%'}}>
            <TextField label={`Search ${searchType}`} variant="standard"
                id="standard-basic"
                options={options}
                onInputChange={onInputChange}
                getOptionLabel={(option) => option.title}
                onChange={onInputChange}
                style={{ width: "100%" }}
            />
            <IconButton aria-label="search" onClick={searchForValue}>
                <SearchIcon />
            </IconButton>
        </Box>

    );
}