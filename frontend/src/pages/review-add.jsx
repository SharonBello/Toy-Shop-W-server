import React from "react";
import { connect } from "react-redux";

export class _ReviewAdd extends React.Component{
    state = {
        review: {
            userId: '',
            toyId: '',
            content: '',
        }
    }
    componentDidMount = () => {
        const { user, toy } = this.props
        let userId = ''
        if (user) userId = user._id
        const toyId = toy._id
        this.setState(prevState => ({ ...prevState, review: { ...prevState.review, userId, toyId } }))
    }

    handleChange = ({target}) => {
        this.setState((prevState) => ({...prevState, review: {...prevState.review, content: target.value}}))
    }

    render(){
        const {user} = this.props
        const {review} = this.state
        return(
            <section className="add-review">
                {(user) ? 
                <form className="add-review-form"
                    onSubmit={(ev) => {ev.preventDefault(); onAddReview(review)}}>
                    <textarea 
                        id="content"
                        name="content"
                        rows={7}
                        value={review.content}
                        onChange={this.handleChange}
                    /> 
                    <button>Send</button>
                    </form> : <h2>Plaese login to comment</h2>}
            </section>
        )
    }
}

const mapStateToProps = (storeState) => {
    return {
        toys: storeState.toyModule.toys,
        user: storeState.userModule.user
    }
}

const mapDispatchToProps = {

}

export const ReviewAdd = connect(
    mapStateToProps,
    mapDispatchToProps
)(_ReviewAdd)