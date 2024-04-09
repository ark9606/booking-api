import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from '../users/user.entity';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UserMapper } from 'src/users/user.mapper';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      // for now we're just checking mimicking JWT verification
      // todo implement real JWT verification
      const user = await this.userRepository.findOneOrFail(
        {
          userId: token,
        },
        { populate: [] },
      );
      request['user'] = UserMapper.toDTO(user);
    } catch (e) {
      this.logger.error(e, 'Error at AuthGuard');
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers?.['authorization']?.split(' ') ?? [];
    return type === 'userId' ? token : undefined;
  }
}
