import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Comment } from 'db/entities/comment.entity';
import { CommentsModule } from './comments/comments.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path, { join } from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${path.extname(file.originalname)}`);
        },
      }),
    }),
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
  controllers: [],
  providers: [],
})
export class AppModule {}
