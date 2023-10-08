import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import {UserModule} from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [process.env.STAGE ? `.env.${process.env.STAGE}` : '.env'],
      isGlobal: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
