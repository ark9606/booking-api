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

@Module({
  imports: [
    MikroOrmModule.forRoot(dbConfig),
    UsersModule,
    RoomsModule,
    ReservationsModule,
    CommonModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
