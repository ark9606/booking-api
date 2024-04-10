import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UserDTO } from 'src/users/application/user.dto';
import { UsersService } from 'src/users/application/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  public async list(): Promise<UserDTO[]> {
    return this.usersService.listAll();
  }
}
