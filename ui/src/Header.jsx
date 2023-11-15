import { Container, Paper } from '@mui/material';
import { React } from 'react';


export default function Header({ text }) {

    return (
        <Container>
            <Paper sx={{px:2, py:1, my:2, border:1, borderColor: '#F05454'}}>
                <h1 style={{marginTop: '1px', marginBottom: '1px'}}>{text}</h1>
            </Paper>
        </Container>
    )
}