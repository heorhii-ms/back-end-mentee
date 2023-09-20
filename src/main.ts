import {Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {NestFactory} from '@nestjs/core';

import {AppModule} from './app.module';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const serverHost = config.get<string>('API_HOST') || 'http://localhost';
  const serverPort = config.get<number>('API_PORT') || 3000;
  const rootServerPath = `${serverHost}:${serverPort}`;

  await app.listen(serverPort, () => {
    logger.log(`
    Server:
    The server runs on: ${rootServerPath}
    `);
  });
}
bootstrap();
