import { IComment } from "../../types/comment.type";
import { CommentItem } from "../CommentItem";

type Props = {
  comments: IComment[];
};

export const CommentsList: React.FC<Props> = ({ comments }) => {
  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id}>
          <CommentItem comment={comment} />
        </div>
      ))}
    </>
  );
};
