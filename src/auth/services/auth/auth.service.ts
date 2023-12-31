import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../../users/services/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords, encodePassword } from '../../../users/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByUsername(username);
    if (!comparePasswords(pass, user.password)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, username: user.username };
    const access_token= await this.jwtService.signAsync(payload);

    

    return access_token;
  }

  
}
