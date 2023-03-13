import { IComment } from "../../types/comment.type"

type Props = {
    comment: IComment;
    answers: IComment[];
}

export const CommentItem: React.FC<Props> = ({ comment, answers }) => {}
