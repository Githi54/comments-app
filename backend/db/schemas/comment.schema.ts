export class CommentSchema {
  id: number;
  username: string;
  userAvatar: 'none' | 'man' | 'woman';
  email: string;
  homePage?: string;
  text: string;
  attachmentUrl?: string;
  isAnswer: boolean;
  answeredToCommentId?: number;
  createdAt: Date;
}
