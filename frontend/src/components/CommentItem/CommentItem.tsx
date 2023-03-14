import { Avatar, Box, Typography } from "@material-ui/core";
import { IComment } from "../../types/comment.type";

type Props = {
  comment: IComment;
  answers: IComment[];
};

export const CommentItem: React.FC<Props> = ({ comment, answers }) => {
  const {
    id,
    text,
    userName,
    userAvatar,
    email,
    homePage,
    attachmentUrl,
    isAnswer,
    answeredToCommentId,
  } = comment;
  const answersForComment = answers.filter(
    (answer) => answer.answeredToCommentId === id
  );

  console.log(answersForComment);

  return (
    <Box
      style={{ display: "flex", flexDirection: "column", maxWidth: "500px" }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "lightgrey",
          padding: "10px",
          gap: "10px"
        }}
      >
        <Avatar
          src={`avatars/${userAvatar}.png`}
          style={{ backgroundColor: "gray"}}
        />
        <Typography style={{fontWeight: "bold"}}>{userName}</Typography>
      </Box>
      <Box>
        <Typography style={{padding: "5px"}}>{text}</Typography>
      </Box>
    </Box>
  );
};
