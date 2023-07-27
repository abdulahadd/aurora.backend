import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './Models/user.schema';
import { UsersRepository } from './repository/users.repository';

@Module({
  imports:[forwardRef(()=>MongooseModule.forFeature([{name: User.name, schema: UserSchema}]))],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports:[UsersService]
})
export class UsersModule {}
