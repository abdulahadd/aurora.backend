import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';


@Module({
  imports: [UsersModule,  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '120s' },
  }),],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthModule],
  
})
export class AuthModule {}
