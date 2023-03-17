export interface IComment {
  id?: number;
  userName: string;
  userAvatar: string;
  email: string;
  homePage: string | null;
  text: string;
  attachmentUrl?: string;
  isAnswer: boolean;
  answeredToCommentId: number | null;
  createdAt?: string;
}
