import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CommentSeeder } from 'db/seeds/comment.seed';
import { SeederModule } from 'db/seeds/seeder.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(SeederModule);
  const seeder = app.get(CommentSeeder);
  seeder
    .seed()
    .then(() => {
      console.log('Seeding complete!');
    })
    .catch((error) => {
      console.log('Seeding failed!');
      throw error;
    })
    .finally(() => app.close());
}
bootstrap();
