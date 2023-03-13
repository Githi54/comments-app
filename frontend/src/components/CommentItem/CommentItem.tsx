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

  return <p>{text}</p>;
};
