import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';

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
    ])
  ],
  controllers: [AuthController]
})
export class AuthModule {}
