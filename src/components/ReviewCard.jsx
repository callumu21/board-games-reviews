import { formatCategories, formatDate } from "../utils/formattingFunctions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReviewVoteButton from "../components/ReviewVoteButton";

export default function ReviewCard({
  review: {
    review_id,
    owner,
    category,
    review_img_url,
    created_at,
    title,
    designer,
    votes,
    comment_count,
  },
}) {
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  return (
    <section className="review-card">
      <div className="review-card__title">
        <p>{title}</p>
      </div>
      <img src={review_img_url} className="review-card__img" alt="" />
      <div className="review-card__info">
        <p>Written by {owner}</p>
        <p>Published on {formatDate(created_at)}</p>
        <p>Category: {formatCategories(category)}</p>
        <p>Designed by {designer}</p>
      </div>
      <button
        className="review-card__btn"
        onClick={() => {
          navigate(`/reviews/${review_id}`);
        }}
      >
        Read more!
      </button>
      <div className="review-card__engagement-stats">
        <div className="review-card__engagemenet-stats-labels">
          <div className="review-card__comment flex-center">
            <img
              className="review-card__icon"
              src="/comment.png"
              alt="comment button icon"
            ></img>
            <p>{comment_count}</p>
          </div>
          <ReviewVoteButton
            votes={votes}
            review_id={review_id}
            setErr={setErr}
          />
        </div>
      </div>
      <p className="review-card__engagement-stats-error error">
        {err ? "It looks like your vote wasn't counted!" : ""}
      </p>
    </section>
  );
}
