import { PartialType } from "@nestjs/swagger";
import { Comment } from "../models/commentSchema";



export class UpdateCommentDto extends PartialType(Comment){}