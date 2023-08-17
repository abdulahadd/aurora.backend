
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users/users.service';
  
  @Injectable()
  export class SuperUserGuard implements CanActivate {
    constructor(private jwtService: JwtService, private userService: UsersService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const params=request.params;
      console.log(params);
      const user= await this.userService.getUserByUsername(params.s_username);
      if(user.role==='SuperUser')
        return true;
        else
            throw new UnauthorizedException("only super user can access");
    }


  }