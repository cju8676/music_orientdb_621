// import { React } from 'react';

// export default function Song(props) {
//     return (
//         <div>
//             <div>picture icon goes here</div>
//             <h1>Song</h1>
//             <p>Title</p>
//             <p>Artist</p>
//             <p>Extra cool things about song</p>
//         </div>
//     );
// }
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 275, minHeight: 400 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Song
        </Typography>
        <Typography variant="h5" component="div">
          Eye of the Tiger
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Survivor
        </Typography>
        <Typography variant="body2">
            Extra cool things about song like genre, length, etc.
        </Typography>
        <Avatar variant="rounded" src={process.env.PUBLIC_URL + '/music.png'} sx={{ width: 56, height: 56}}/>
      </CardContent>
    </Card>
  );
}