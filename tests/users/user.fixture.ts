import { faker } from '@faker-js/faker';
import { UserDTO } from '../../src/users/application/user.dto';
import { UserEntity } from '../../src/users/infrastructure/persistence/user.entity';
import { generateUUID } from '../../src/common/utils';

export class UserFixture {
  public static createDTO(): UserDTO {
    return {
      userId: generateUUID(),
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    };
  }

  public static createEntity(): UserEntity {
    const user = new UserEntity();
    user.userId = generateUUID();
    user.email = faker.internet.email();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();

    return user;
  }
}
