import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'M_SERVICE',
        transport: Transport.REDIS,
        options: {
          url: 'redis://localhost:6379'
        }
      }
    ]),
  ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`
  }),
  AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
