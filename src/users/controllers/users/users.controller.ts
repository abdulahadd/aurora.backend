import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../Models/user.schema';
import { UpdateUserDto } from '../../dtos/updateUserDto';
import { SerializedUser } from '../../utils/types';
import { AuthGuard } from '../../../auth/guards/auth.guard';
import { UserModel } from '../../Models/user.model';
import { SuperUserGuard } from '../../../auth/guards/super.user.guard';
import { query } from 'express';
@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard)
  @UseGuards(SuperUserGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/all/:s_username')
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/list/:s_username')
  async ListUsers(
    @Query("orgId") orgId: string=null,
    @Query("role") role: string=null,
  ): Promise<User[]> {
    console.log(orgId, role)
    return this.userService.listUsers(orgId, role);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:username/:s_username')
  async getUserByUsername(@Param('username') username: string): Promise<User> {
    const user = await this.userService.getUserByUsername(username);
    return new SerializedUser(user);
  }

  @Post('')
  @UsePipes(ValidationPipe)
  async createUser(@Body() user: UserModel): Promise<User> {
    console.log('Body: ', user);
    return this.userService.createUser(user);
  }

  @UseGuards(AuthGuard)
  @Patch('/patch/:username/:s_username')
  async updateUser(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(username, updateUserDto);
  }
}
