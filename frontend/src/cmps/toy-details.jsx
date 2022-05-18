import React from "react"
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { toyService } from "../services/toy.service.js"
import { userService } from "../services/user.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import {loadReviews, removeReview } from '../store/actions/review.action.js'
import { removeToy, getById } from "../store/actions/toy.action.js"
import { ReviewAdd, } from "./review-add.jsx"
import {ReviewList} from '../cmps/review-list.jsx'

class _ToyDetails extends React.Component {

    state = {
        toy: null
    }

    componentDidMount() {
        const { toyId } = this.props.match.params
        if (toyId) this.props.getById(toyId)

        this.props.loadReviews({byToyId:toyId})
    }

    onRemoveToy = (toyId) => {
        this.props.removeToy(toyId)
        this.onGoBack()

    }

    onRemoveReview = async reviewId => {
        await this.props.removeReview(reviewId)
    }

    onGoBack = () => {
        this.props.history.push('/toy')
    }


    render() {
        const { toy, reviews, user } = this.props
        if (!toy) return <div>Loading toy...</div>
        return (
            <section className='toy-details'>
                <h3>Details</h3>
                <h4>{toy.name}</h4>
                <p>In stock: <span>{(toy.inStock) ? 'Yes' : 'No'}</span></p>
                <p>Price: <span>{toy.price}</span></p>
                <p>Labels: <span key={toy.labels.map((label, idx) => idx)}>{toy.labels.map((label, idx) => {
                    return (idx === toy.labels.length - 1) ? label : label + ', '
                })}</span></p>
                <ReviewAdd toy={toy}/>
                <p>Reviews: <span>{toy.review}</span></p>
                <ReviewList toy={toy} reviews={reviews} onRemoveReview={this.onRemoveReview} user={user}/> 
                <div>
                    <button onClick={() => this.onRemoveToy(toy._id)}>x</button>
                    <Link to={`/toy/edit/${toy._id}`}><button>Edit</button></Link>
                    <button onClick={this.onGoBack}>back</button>
                </div>
            </section>
        )
    }

}


const mapStateToProps = (storeState) => {
    return {
        user: storeState.userModule.user,
        toys: storeState.toyModule.toys,
        toy: storeState.toyModule.toy,
        reviews: storeState.reviewModule.reviews
    }
}

const mapDispatchToProps = {
    removeToy,
    getById,
    loadReviews,
    removeReview
}

export const ToyDetails = connect(mapStateToProps, mapDispatchToProps
)(_ToyDetails)
