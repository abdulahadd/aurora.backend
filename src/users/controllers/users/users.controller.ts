import { Body, ClassSerializerInterceptor, Controller, Get, Param, Patch, Post, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../Models/user.schema';
import { UpdateUserDto } from '../../dtos/updateUserDto';
import { SerializedUser } from '../../utils/types'; 
import { AuthGuard } from '../../../auth/guards/auth.guard';
import { UserModel } from '../../Models/user.model';
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @UseGuards(AuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/all/:s_username')
    async getUsers(): Promise<User[]>{
        return this.userService.getUsers();
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)  
    @Get('/:username/:s_username')
    async getUserByUsername(@Param('username') username: string): Promise<User>{
        const user= await this.userService.getUserByUsername(username);
        //if(user.role.name==="Super_User")
        return new SerializedUser(user);
    }

    @UseGuards(AuthGuard)
    @Post(':s_username')
    @UsePipes(ValidationPipe)
    async createUser(@Body() user: UserModel): Promise<User>{
        return this.userService.createUser(user);
    }

    @UseGuards(AuthGuard)
    @Patch(':s_username')
    async updateUser(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto): Promise<User>{
        return this.userService.updateUser(username, updateUserDto);
    }

}
