import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'comments',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
