import { Link } from 'react-router-dom'

import { utilService } from '../services/util.service.js'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';


export function ToyPreview({ toy, onRemoveToy }) {

    return (
        <li className="toy-preview">
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={require(`../assets/img/${toy.name}.jpg`)}
                        alt="toys"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {toy.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <b>Description:</b><br></br>
                            {utilService.makeLorem()}
                        </Typography><br></br>
                        <Typography variant="body1" >
                            <b>Price: $</b>{toy.price}
                        </Typography>
                        <Typography variant="body1">
                            <b>Type: </b><span>{toy.labels.map((label, idx) => {
                                return (idx === toy.labels.length - 1) ? label : label + ', '
                            })}</span>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Stack direction="row" spacing={2}>
                    <ButtonGroup color="secondary" aria-label="medium secondary button group">
                        <Button onClick={() => onRemoveToy(toy._id)} variant="outlined" startIcon={<DeleteIcon />}>
                            Delete
                        </Button>

                        <Link to={`/toy/edit/${toy._id}`}><Button variant="contained" startIcon={<EditIcon />}>
                            Edit
                        </Button>
                        </Link>
                        <Link to={`/toy/${toy._id}`}><Button size="small" color="primary">
                            Details
                        </Button>
                        </Link>
                        </ButtonGroup>
                    </Stack>
                </CardActions>
            </Card>
        </li>
    )
}
