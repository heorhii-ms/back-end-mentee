import {Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {NestFactory} from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';

import {AppModule} from './app.module';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Beck-end Mentee')
    .setDescription('The Beck-end Mentee API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

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
