import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  mixin,
} from '@nestjs/common';
import { Request } from 'express';
import { ObjectSchema } from 'joi';
import { Observable } from 'rxjs';
import { formatError } from './formatError';

export const validate = (schema: ObjectSchema) => {
  @Injectable()
  class ValidationInterceptor implements NestInterceptor {
    async intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
    ): Promise<Observable<any>> {
      const request = context.switchToHttp().getRequest<Request>();

      try {
        const modifiedRequest = await schema.validateAsync(request, {
          abortEarly: false,
          allowUnknown: true,
          presence: 'required',
          skipFunctions: true,
          errors: {
            label: 'key',
            wrap: {
              label: false,
            },
          },
        });

        // override request with modified request after validation
        request.query = modifiedRequest.query;
        request.body = modifiedRequest.body;

        return next.handle();
      } catch (error) {
        if (error.isJoi && error.name === 'ValidationError') {
          throw new BadRequestException(formatError(error));
        }
        throw error;
      }
    }
  }
  return mixin(ValidationInterceptor);
};
