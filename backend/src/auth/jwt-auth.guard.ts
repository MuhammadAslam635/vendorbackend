import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    console.log('JWT Guard - User:', request.user); // Debug log
    return result;
  }

  handleRequest(err: any, user: any) {
    console.log('JWT Guard - HandleRequest:', { err, user }); // Debug log
    if (err || !user) {
      throw err;
    }
    return user;
  }
}