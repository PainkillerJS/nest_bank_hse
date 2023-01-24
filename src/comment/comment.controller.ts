import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CurrentUser } from '../user/decorators/user.decorator';
import { CommentDto } from './dto/comment.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Roles } from '../auth/decorators/role.decorator';
import { ROLE } from '../user/entities/user.entity';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UsePipes(new ValidationPipe())
  @Auth()
  @HttpCode(200)
  @Post('/create')
  async createComment(@CurrentUser('id') id: number, @Body() dto: CommentDto) {
    return this.commentService.create(id, dto);
  }

  @Roles(ROLE.ADMIN)
  @Auth()
  @HttpCode(200)
  @Delete('delete-all-comment-on-product/:product_id')
  async deleteCommentsByProduct(
    @Param('product_id', ParseIntPipe) product_id: number,
  ) {
    return this.commentService.deleleAllCommentOnProduct(product_id);
  }

  @Roles(ROLE.ADMIN)
  @Auth()
  @HttpCode(200)
  @Delete(':comment_id')
  async deleteById(@Param('comment_id', ParseIntPipe) comment_id: number) {
    return this.commentService.deleteCommentById(comment_id);
  }
}
