export interface IComment {
  id: number;
  userName: string;
  userAvatar: string;
  email: string;
  homePage?: string;
  text: string;
  attachmentUrl?: string;
}
