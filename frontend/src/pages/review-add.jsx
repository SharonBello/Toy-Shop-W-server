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