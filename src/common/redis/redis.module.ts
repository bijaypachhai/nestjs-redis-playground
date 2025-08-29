import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createClient } from 'redis';
import { REDIS_CLIENT_CONNECTION } from './redis.constant';

@Module({
  imports: [],
  providers: [
    {
      provide: REDIS_CLIENT_CONNECTION,
      inject: [],
      useFactory: async () => {
        let isConnected = false;
        const logger = new Logger(RedisModule.name);
        const client = createClient({
          password: '',//configService.get<string>('helper.redis.password'),
          socket: {
            host: 'localhost',//configService.get<string>('helper.redis.host'),
            port: 6379,//Number(configService.get<number>('helper.redis.port')),
            reconnectStrategy: (retries) => {
              if (retries > 50) {
                logger.error('Redis limit retry connection');
                throw new Error('Redis limit retry connection');
              } else if (retries > 25) {
                return 30 * 1000;
              }
              if (retries > 10) {
                return 15 * 1000;
              }
              return 10 * 100;
            },
          },
        });

        client.on('error', (err) => {
          isConnected = false;
          logger.error('Redis Connect Error');
          logger.error(err);
        });
        

        client.on('connect', () => {
          isConnected = true;
          logger.log('Redis is connected successfully');
        });

        await client.connect();
        return client;
      },
    },
  ],
  exports: [REDIS_CLIENT_CONNECTION],
})
export class RedisModule {}
