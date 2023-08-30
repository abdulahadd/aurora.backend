import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
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
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(SuperUserGuard)
  @Get('/all/:s_username')
  async getUsers(): Promise<SerializedUser[]> {
    const users = await this.userService.getUsers();
    return users;
  }

  @Get('/list')
  async ListUsers(
    @Query("orgId") orgId: string=null,
  ): Promise<User[]> {

    const users=await this.userService.listUsers(orgId);
    return users;
  }

  @Get('/by-ids')
  async getUsersByList(@Query('ids', new ParseArrayPipe({ items: String, separator: ',' })) list: string[]): Promise<User[]> {
    const user = await this.userService.getUsersbyList(list);
    return user;
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
