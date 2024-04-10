import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from './user.repository.interface';
import { DI_TOKENS } from 'src/common/di-tokens';
import { UserDTO } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DI_TOKENS.USER_REPOSITORY)
    private readonly reservationRepo: IUserRepository,
  ) {}

  public async listAll(): Promise<UserDTO[]> {
    return this.reservationRepo.listAll();
  }
}
