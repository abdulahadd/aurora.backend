import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CommentsRepository } from '../../repository/comments.repository';
import { Comment } from '../../models/commentSchema';
import { CommentModel } from '../../models/commentModel';
import { UpdateCommentDto } from '../../dtos/updateCommentDto';

@Injectable()
export class CommentsService {
    constructor(private readonly commentRepository: CommentsRepository) {}
    async getComments(): Promise<Comment[]> {
      try {
        const comments = await this.commentRepository.find({});
        return comments;
      } catch (error) {
        throw new HttpException(error.message, error.status);
      }
    }
  
    async getCommentById(_id: string): Promise<any> {
      try {
        const comment = await this.commentRepository.findOne({ _id });
        if (comment) {
          return comment;
        } else {
          throw new NotFoundException('Comment not found');
        }
      } catch (error) {
        throw new HttpException(error.message, error.status);
      }
    }
  
    async getCommentByEvent(eventId: string): Promise<any> {
      try {
        const comment = await this.commentRepository.find({ eventId });
        if (comment) {
          return comment;
        } else {
          throw new NotFoundException('User not found');
        }
      } catch (error) {
        throw new HttpException(error.message, error.status);
      }
    }
  
    async createComment(createComment: CommentModel) {
      try {
        return this.commentRepository.create(createComment);
      } catch (error) {
        throw new HttpException(error.message, error.status);
      }
    }
  
    async updateComment(
      title: string,
      updateCommentDto: UpdateCommentDto,
    ): Promise<Comment> {
      try {
          const comment = await this.commentRepository.findOne({ title });
          if (!comment) {
              throw new NotFoundException('User not found');
          }
          return this.commentRepository.findOneAndUpdate({ title }, updateCommentDto);
          
      } catch (error) {
        throw new HttpException(error.message, error.status);
      }
  
    }

    async deleteComment(_id: string){
        try {
            const comment = await this.commentRepository.findOne({ _id });
            if (!comment) {
                throw new NotFoundException('Comment not found');
            }
            return this.commentRepository.deleteComment({_id});
            
        } catch (error) {
          throw new HttpException(error.message, error.status);
        }

    }
}