import { Link } from 'react-router-dom'

import { utilService } from '../services/util.service.js'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

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
                    <Button onClick={() => onRemoveToy(toy._id)} size="small" color="primary">
                        X
                    </Button>
                    <Link to={`/toy/edit/${toy._id}`}><Button size="small" color="primary">
                        Edit
                    </Button>
                    </Link>
                    <Link to={`/toy/${toy._id}`}><Button size="small" color="primary">
                        Details
                    </Button>
                    </Link>
                </CardActions>
            </Card>
        </li>
    )
}
