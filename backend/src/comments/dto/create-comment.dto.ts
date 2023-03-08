export class CreateCommentDto {
  readonly userName: string;
  readonly email: string;
  readonly homePage?: string;
  readonly text: string;
}
