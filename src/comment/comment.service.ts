import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { CommentDto } from './dto/comment.dto';
import { BankProductEntity } from '../bank-product/entities/bank-product.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async create(
    userId: UserEntity['id'],
    { bankProductId, message }: CommentDto,
  ) {
    const newComment = this.commentRepository.create({
      bankProduct: { id: bankProductId },
      message,
      user: { id: userId },
    });

    return this.commentRepository.save(newComment);
  }

  async deleteCommentById(commentId: CommentEntity['id']) {
    return this.commentRepository.delete({ id: commentId });
  }

  async deleleAllCommentOnProduct(productId: BankProductEntity['id']) {
    return this.commentRepository.delete({ bankProduct: { id: productId } });
  }
}
