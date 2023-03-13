export interface IComment {
  id: number;
  username: string;
  userAvatar: string;
  email: string;
  homePage?: string;
  text: string;
  attachmentUrl?: string;
}
