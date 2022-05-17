import { Link } from 'react-router-dom'
import React from 'react'
import { utilService } from '../services/util.service.js'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


export class ToyPreview extends React.Component {
   
    state = {
        value: 0
    }

    // function(event: React.SyntheticEvent, value: number | null) => void

    setValue = (newValue) => {
        this.setState({value: newValue})
    }
    
    render() {
    const { toy, onRemoveToy } = this.props
    // console.log('toy',toy )

        // const Rating = styled(Rating)({
        //     '& .MuiRating-iconFilled': {
        //         color: '#ff8eb0',
        //     },
        //     '& .MuiRating-iconHover': {
        //         color: '#ff004c',
        //     },
        // });

        return (
            <li className="toy-preview">
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            // image={require(`../assets/img/${toy.name}.jpg`)}
                            alt="toys"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {toy.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <b>Description:</b><br></br>
                                {/* {toy.description} */}
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
                                <Link to={`/toy/${toy._id}`}><Button variant="contained" startIcon={<RateReviewIcon />}>
                                    Review
                                </Button>
                                </Link>
                            </ButtonGroup>
                        </Stack>
                    </CardActions>
                    <Box
                        sx={{
                            '& > legend': { mt: 2 },
                        }}>
                        <Rating
                            name="rating"
                            value={this.state.value}
                            getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={0.5}
                            icon={<FavoriteIcon fontSize="inherit" />}
                            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                            onChange={(event, newValue) => {
                                this.setValue(newValue);
                            }}
                        />
                    </Box>
                </Card>
            </li>
        )
    }
}
