import { Box } from "@material-ui/core"
import { IComment } from "../../types/types/comment.type";
import { CommentItem } from "../CommentItem";

type Props = {
  comments: IComment[];
};

export const CommentsList: React.FC<Props> = ({ comments }) => {
  const mainComments = comments.filter((comment) => !comment.isAnswer);
  const answers = comments.filter((comment) => comment.isAnswer);

  return (
    <Box style={{display: "flex", flexDirection: "column", gap: "10px"}}>
      {mainComments.map((comment) => (
        <div key={comment.id}>
          <CommentItem comment={comment} answers={answers} />
        </div>
      ))}
    </Box>
  );
};
