import { Body, Controller, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { CommentsService } from '../../service/comments/comments.service';
import { Comment } from '../../models/commentSchema';
import { CommentModel } from '../../models/commentModel';
import { UpdateCommentDto } from '../../dtos/updateCommentDto';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentService: CommentsService) {}

    @Get('')
    async getComments(): Promise<Comment[]> {
      try {
        return this.commentService.getComments();
      } catch (error) {
        throw new HttpException(error.message, error.status);
      }
    }
  
    @Get('/:id')
    async getCommentById(@Param('id') Id: string): Promise<Comment> {
      try {
        const event = await this.commentService.getCommentById(Id);
        return event;
      } catch (error) {
        throw new HttpException(error.message, error.status);
      }
    }
  
    @Get('/event/:id')
    async getCommentByEvent(@Param('id') eventId: string): Promise<Comment> {
      try {
        const event = await this.commentService.getCommentByEvent(eventId);
        return event;
      } catch (error) {
        throw new HttpException(error.message, error.status);
      }
    }
  
  
  
    @Post('')
    async createComment(@Body() event: CommentModel): Promise<Comment> {
      try {
        return this.commentService.createComment(event);
      } catch (error) {
        throw new HttpException(error.message, error.status);
      }
    }
  
    @Patch('/:title')
    async updateUser(
      @Param('title') Id: string,
      @Body() updateCommentDto: UpdateCommentDto,
    ): Promise<Comment> {
      try {
        return this.commentService.updateComment(Id, updateCommentDto);
      } catch (error) {
        throw new HttpException(error.message, error.status);
      }
    }
}
