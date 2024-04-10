import { UserDTO } from '../../application/user.dto';
import { UserEntity } from './user.entity';

export class UserMapper {
  static toDTO(entity: UserEntity): UserDTO {
    return {
      userId: entity.userId,
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email,
    };
  }

  static toEntity(dto: UserDTO): UserEntity {
    const entity = new UserEntity();
    entity.userId = dto.userId;
    entity.firstName = dto.firstName;
    entity.lastName = dto.lastName;
    entity.email = dto.email;
    return entity;
  }
}
