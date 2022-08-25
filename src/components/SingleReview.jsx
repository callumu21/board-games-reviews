import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getReviewById } from "../utils/api";
import { formatDate, formatCategories } from "../utils/formattingFunctions";
import ReviewVoteButton from "./ReviewVoteButton";
import CommentSection from "./CommentSection";

export default function SingleReview() {
  const [review, setReview] = useState();
  const [err, setErr] = useState(null);
  const { review_id } = useParams();

  useEffect(() => {
    getReviewById(review_id).then((review) => setReview(review));
  }, [review_id]);

  if (review) {
    return (
      <>
        <section className="single-review">
          <div className="single-review__title">
            <h2>{review.title}</h2>
          </div>
          <div className="single-review__author-info">
            <p>Written by {review.owner}</p>
            <p>Published on {formatDate(review.created_at)}</p>
          </div>
          <img
            src={review.review_img_url}
            className="single-review__img"
            alt=""
          />
          <div className="single-review__game-info">
            <Link
              to={`/reviews/category/${review.category}`}
              className="single-review__category-link"
            >
              <p>Category: {formatCategories(review.category)}</p>
            </Link>
            <p>Designed by {review.designer}</p>
          </div>
          <p className="single-review__body">{review.review_body}</p>
          <div className="single-review__engagement-stats">
            <div className="single-review__engagement-stats-labels">
              <div className="single-review_comment flex-center">
                <img
                  className="review-card__icon"
                  src="/comment.png"
                  alt="comment button icon"
                ></img>
                <p>{review.comment_count}</p>
              </div>
              <ReviewVoteButton
                review_id={review.review_id}
                votes={review.votes}
                setErr={setErr}
              />
            </div>
            <p className="single-review__engagement-stats-error error">
              {err ? "It looks like your vote wasn't counted!" : ""}
            </p>
          </div>
        </section>
        <CommentSection />
      </>
    );
  }
}
