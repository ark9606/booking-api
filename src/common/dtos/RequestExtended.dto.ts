import { Request } from 'express';
import { UserDTO } from 'src/users/application/user.dto';

export interface RequestExtendedDTO extends Request {
  user: UserDTO;
}
