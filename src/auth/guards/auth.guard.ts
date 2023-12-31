
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { jwtConstants } from '../constants';
  import { Request } from 'express';
  import * as cookieParser from 'cookie-parser';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const params=request.params;
      console.log(params);
      const token = this.extractTokenFromCookie(request);
     // console.log(token);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: jwtConstants.secret
          }
        );
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        //console.log(payload);
        request['user'] = payload;
        if(params.s_username!== payload.username)
        {
          throw new UnauthorizedException();
        }
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromCookie(request: Request): string | undefined {
      const data = request.cookies?.['Login-Cookie'];
      return data|| undefined;
    }
  }