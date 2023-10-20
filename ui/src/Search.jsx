import {React, useState} from 'react';
import Paper from '@mui/material/Paper';
import { Autocomplete, TextField } from '@mui/material';

export default function Search() {
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

    const onInputChange = (event, value, reason) => {
    if (value) {
        getData(value);
    } else {
        setOptions([]);
    }
    };
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
        <Autocomplete
            id="combo-box-demo"
            options={options}
            onInputChange={onInputChange}
            getOptionLabel={(option) => option.title}
            style={{ width: "100%" }}
            renderInput={(params) => (
                <TextField {...params} label="Search Songs..." variant="filled" />
                )}
        />
    </Paper>
  );
}