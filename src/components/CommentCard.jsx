import "../styles/CommentSection.css";
import { formatDate } from "../utils/formattingFunctions";
import CommentVoteButton from "./CommentVoteButton";

export default function CommentCard({
  comment: { author, created_at, votes, body, comment_id },
}) {
  return (
    <section className="comment-card">
      <div className="comment-card__author-info">
        <p>
          Written by {author} on {formatDate(created_at)}
        </p>
      </div>
      <div className="comment-card__body">
        <p>{body}</p>
      </div>
      <CommentVoteButton votes={votes} comment_id={comment_id} />
    </section>
  );
}
