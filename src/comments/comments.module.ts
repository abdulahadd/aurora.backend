import { Module, forwardRef } from '@nestjs/common';
import { CommentsController } from './controller/comments/comments.controller';
import { CommentsService } from './service/comments/comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './models/commentSchema';
import { CommentsRepository } from './repository/comments.repository';

@Module({
  imports: [forwardRef(()=>MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}]))],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository]
})
export class CommentsModule {}
