
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { jwtConstants } from '../constants';
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const params=request.params;
      console.log(params);
      const token = this.extractTokenFromHeader(request);
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
  
    // private extractTokenFromCookie(request: Request): string | undefined {
    //   const data = request.cookies?.['Login-Cookie'];
    //   return data|| undefined;
    // }

    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }