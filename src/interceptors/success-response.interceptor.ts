import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T | null;
}

interface ResponseStructure<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T | null;
}

@Injectable()
export class SuccessResponseInterceptor<T> implements NestInterceptor<
  T,
  Response<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data: { statusCode?: number; message?: string; data?: T }) => {
        const responseStructure: ResponseStructure<T> = {
          success: true,
          statusCode: data?.statusCode || HttpStatus.OK,
          message: data?.message || 'success',
          data: data?.data || null,
        };
        context.switchToHttp().getResponse().status(HttpStatus.OK);
        return responseStructure;
      }),
    );
  }
}
