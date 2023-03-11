export class CreateCommentDto {
  readonly userName: string;
  readonly userAvatar: string;
  readonly email: string;
  readonly homePage?: string;
  readonly text: string;
  attachmentUrl: string;
}
