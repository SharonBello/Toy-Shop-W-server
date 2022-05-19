import { useEffect, useState } from "react"
// import { utilService } from '../services/util.service.js'

import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import { useEffectUpdate } from "../hooks/useEffectUpdate"
import FavoriteIcon from '@mui/icons-material/Favorite';
// import { styled } from '@mui/material/styles';

export const RatingValue = ({handleRatingChange, toy}) => {
    const [value, setValue] = useState(0)
    const [isFilled, setIsFilled] = useState(true)

    const getStyle = () => {
        return isFilled ? {'& .MuiRating-iconFilled': {color: '#ff8eb0'}} : {'& .MuiRating-iconHover': {color: '#ff004c'}}
    }

    const handleOnChange = (e, newValue, toy) => {
        setValue(newValue);
        toy.rating = newValue;
        handleRatingChange(toy);
    }

    return (    
        <Rating
            name="rating"
            value={value}
            getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
            precision={0.5}
            icon={<FavoriteIcon fontSize="inherit" />}
            style={getStyle()}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            // onChange={() => onChangeRate({value})}
            onChange={(event, newValue) => handleOnChange(event, newValue, toy)}
              />
    )
}
