export class CommentSchema {
  id: number;
  username: string;
  userAvatar: string;
  email: string;
  homePage?: string;
  text: string;
  attachmentUrl?: string;
  isAnswer: boolean;
  answeredToCommentId?: number;
}
