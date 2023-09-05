import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from '../../Models/user.schema';
import { UsersRepository } from '../../repository/users.repository';
import { UpdateUserDto } from '../../dtos/updateUserDto';
import { plainToClass } from 'class-transformer';
import { SerializedUser } from '../../utils/types';
import { encodePassword } from '../../utils/bcrypt';
import { UserModel } from '../../Models/user.model';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUsers(): Promise<SerializedUser[]> {
    const users = await this.usersRepository.find({});
    return users.map((user) => plainToClass(SerializedUser, user));
  }

  async listUsers(orgId: string = null): Promise<User[]> {
    const users = await this.usersRepository.find({ orgId });
    return users.map((user) => plainToClass(SerializedUser, user));
  }

  async getUsersbyList(list: string[]): Promise<User[]> {
    if (Array.isArray(list)) {
      const users = await this.usersRepository.find({
        _id: { $in: list },
      });
      return users.map((user) => plainToClass(SerializedUser, user));
    } else {
      throw new NotFoundException('List not found');
    }
  }

  async getUserByUsername(username: string): Promise<any> {
    const user = await this.usersRepository.findOne({ username });
    if (user) {
      return user;
    } else {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
  }

  async createUser(createUserDto: UserModel) {
    const username = createUserDto.username;

    const user = await this.usersRepository.findOne({ username });
    if (user) {
      throw new UnprocessableEntityException('User Already Exists');
    }
    const password = encodePassword(createUserDto.password);
    return this.usersRepository.create({ ...createUserDto, password });
  }

  async updateUser(
    username: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({ username });
    if (!user) {
      throw new UnprocessableEntityException('User Not Found');
    }
    if (updateUserDto.password) {
      const password = encodePassword(updateUserDto.password);
      return this.usersRepository.findOneAndUpdate(
        { username },
        { ...updateUserDto, password },
      );
    }

    return this.usersRepository.findOneAndUpdate({ username }, updateUserDto);
  }
}
