export function ReviewPreview({ review, onRemoveReview, user }) {
    return (
        <div className="review-card">
            <h1>Name: {review.userId}</h1>
            <h3>Comment: {review.content}</h3>
            {/* {user && (user._id === review.userId || user.isAdmin) &&
                <button onClick={() => { onRemoveReview(review._id) }} className="review-trash-btn"></button>
            } */}
        </div>
    )
}