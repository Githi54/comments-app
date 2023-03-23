export class CreateCommentDto {
  readonly userName: string;
  readonly userAvatar: 'none' | 'man' | 'woman';
  readonly email: string;
  readonly homePage?: string;
  readonly text: string;
  attachmentUrl?: string;
  readonly captcha?: string;
}
