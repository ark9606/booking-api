import { Request } from 'express';
import { UserEntity } from 'src/users/user.entity';

export interface RequestExtendedDTO extends Request {
  user: UserEntity;
}
