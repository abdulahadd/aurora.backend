import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { FilterQuery, Model } from 'mongoose';
import { Comment, CommentDocument } from '../models/commentSchema';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async findOne(commentFilterQuery: FilterQuery<Comment>): Promise<Comment> {
    try {
      return this.commentModel.findOne(commentFilterQuery).lean();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async find(commentFilterQuery: FilterQuery<Comment>): Promise<Comment[]> {
    try {
      return this.commentModel.find(commentFilterQuery).lean();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async create(comment: Comment): Promise<Comment> {
    try {
      const newComment = new this.commentModel(comment);
      return newComment.save();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOneAndUpdate(
    commentFilterQuery: FilterQuery<Comment>,
    comment: Partial<Comment>,
  ): Promise<Comment> {
    try {
      return this.commentModel.findOneAndUpdate(commentFilterQuery, comment);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async deleteComment(commentFilterQuery: FilterQuery<Comment>) {
    try {
      return this.commentModel.deleteOne(commentFilterQuery);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  
}
