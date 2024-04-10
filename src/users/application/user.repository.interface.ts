import { UserDTO } from 'src/users/application/user.dto';

export interface IUserRepository {
  listAll(): Promise<UserDTO[]>;
}
