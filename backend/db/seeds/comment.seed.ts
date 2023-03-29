import { Comment } from '../entities/comment.entity';
import { faker } from '@faker-js/faker';
import { CommentsService } from 'src/comments/comments.service';
import { Injectable } from '@nestjs/common';

type Avatar = 'none' | 'man' | 'woman';

@Injectable()
export class CommentSeeder {
  constructor(private readonly seedService: CommentsService) {}

  async seed(): Promise<void> {
    for (let i = 0; i <= 87; i++) {
      const senteceCount = Math.floor(Math.random() * 350);
      const avatars: Avatar[] = ['none', 'man', 'woman'];
      const randomAvatarIndex = Math.floor(Math.random() * 3);
      const comment = new Comment();

      comment.userName = faker.internet.userName();
      comment.userAvatar = avatars[randomAvatarIndex];
      comment.email = faker.internet.email();
      comment.homePage = i % 2 === 0 ? faker.internet.url() : null;
      comment.text = faker.random.words(senteceCount);

      await this.seedService.create(comment);

      console.log('Done✔');
    }
  }
}
