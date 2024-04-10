import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Logger } from '@nestjs/common';
import { UserDTO } from 'src/users/application/user.dto';
import { UserMapper } from 'src/users/infrastructure/persistence/user.mapper';
import { UserEntity } from './user.entity';
import { IUserRepository } from 'src/users/application/user.repository.interface';

export class UserRepository implements IUserRepository {
  private readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: EntityRepository<UserEntity>,
  ) {}

  public async listAll(): Promise<UserDTO[]> {
    const entities = await this.repository.find({});
    return entities.map(UserMapper.toDTO);
  }
}
