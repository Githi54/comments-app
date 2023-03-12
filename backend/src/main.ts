import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { join } from 'path';

declare module 'express' {
  interface Request {
    session: any;
  }
}

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    session({
      secret: 'my-secret-key',
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.listen(PORT, () => console.log(`App start in PORT ${PORT}`));
}

bootstrap();
