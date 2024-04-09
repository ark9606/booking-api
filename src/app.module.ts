import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { ReservationsModule } from './reservations/reservations.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import dbConfig from './mikro-orm.config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationsModule } from './notifications/notifications.module';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { REDIS_CONFIG } from './config';

@Module({
  imports: [
    MikroOrmModule.forRoot(dbConfig),
    EventEmitterModule.forRoot(),
    UsersModule,
    RoomsModule,
    ReservationsModule,
    CommonModule,
    AuthModule,
    NotificationsModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore as unknown as CacheStore,
      host: REDIS_CONFIG.HOST,
      port: REDIS_CONFIG.PORT,
      ttl: 300,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
