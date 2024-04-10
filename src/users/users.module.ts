import { Module } from '@nestjs/common';
import { UsersController } from './infrastructure/api/users.controller';
import { UsersService } from './application/users.service';
import { DI_TOKENS } from 'src/common/di-tokens';
import { UserRepository } from './infrastructure/persistence/user.repository';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserEntity } from './infrastructure/persistence/user.entity';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: DI_TOKENS.USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
})
export class UsersModule {}
