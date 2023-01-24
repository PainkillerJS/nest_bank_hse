import { Module } from '@nestjs/common';
import { BankProductService } from './bank-product.service';
import { BankProductController } from './bank-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankProductEntity } from './entities/bank-product.entity';
import { CommentEntity } from '../comment/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BankProductEntity, CommentEntity])],
  controllers: [BankProductController],
  providers: [BankProductService],
})
export class BankProductModule {}
