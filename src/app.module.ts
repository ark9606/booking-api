import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import dbConfig from './mikro-orm.config';

@Module({
  imports: [MikroOrmModule.forRoot(dbConfig), UsersModule, RoomsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
