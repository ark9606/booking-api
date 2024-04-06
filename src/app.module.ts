import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { ReservationsModule } from './reservations/reservations.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
// import { DatabaseModule } from './database/database.module';
import dbConfig from './mikro-orm.config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationsModule } from './notifications/notifications.module';

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
    // DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
