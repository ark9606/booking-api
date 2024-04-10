import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { APP_KEY } from 'src/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly logger = new Logger(ApiKeyGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = this.extractApiKey(request);
    if (!apiKey || apiKey !== APP_KEY) {
      this.logger.error('Invalid API key');
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractApiKey(request: Request): string | undefined {
    return request.headers?.['api_key'];
  }
}
