import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { signInDTo } from '../../dtos/signInDto';
import { AuthGuard } from '../../guards/auth.guard';
import { jwtConstants } from '../../constants';
import * as cookie from 'cookie';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDTo: signInDTo, @Res({ passthrough: true }) response: Response) {

        const access_token= await this.authService.signIn(signInDTo.username, signInDTo.password);

        return access_token;
    }

    @UseGuards(AuthGuard)
    @Get('profile/:username')
    getProfile(@Param('username') username:string , @Req() req){
        return req.user;
    }

}
   
