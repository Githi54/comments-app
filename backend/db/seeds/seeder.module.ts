import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentSeeder } from './comment.seed';
import { Comment } from 'db/entities/comment.entity';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'comments',
      entities: [Comment],
      synchronize: true,
      autoLoadEntities: true,
    }),
    CommentsModule,
  ],
  providers: [CommentSeeder],
})
export class SeederModule {}
