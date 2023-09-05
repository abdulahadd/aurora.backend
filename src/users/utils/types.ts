import { Exclude, Transform } from 'class-transformer';
import { UserDTo } from '../dtos/createUserDtos';
import { ObjectId } from 'mongoose';

export class SerializedUser {
  @Transform((params) => params.obj._id.toString())
  _id: ObjectId;
  username: string;
  email: string;
  @Exclude()
  password: string;
  age: number;
  orgId: string;
  role: string;
  isRegistered: boolean;

  constructor(partial: Partial<UserDTo>) {
    Object.assign(this, partial);
  }
}
