import { Avatar, Box, Button, Typography } from "@material-ui/core";
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
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "500px",
        gap: "15px",
        border: "1px solid gray",
        borderRadius: "5px"
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "lightgrey",
          padding: "10px",
          gap: "10px",
        }}
      >
        <Avatar
          src={`avatars/${userAvatar}.png`}
          style={{ backgroundColor: "gray" }}
        />
        <Typography style={{ fontWeight: "bold" }}>{userName}</Typography>
      </Box>
      <Box>
        <Typography style={{ padding: "5px" }}>{text}</Typography>
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingRight: "20px",
          paddingLeft: "20px",
        }}
      >
        {answersForComment.length > 0 ? (
          <Button style={{ fontSize: "12px" }}>Show answers</Button>
        ) : (
          <div></div>
        )}
        <Button style={{ fontSize: "12px" }}>Add answer</Button>
      </Box>
    </Box>
  );
};