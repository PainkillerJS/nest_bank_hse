import { BaseEntity } from '../../common/utils/Base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { CommentEntity } from '../../comment/entities/comment.entity';

@Entity('bank-product')
export class BankProductEntity extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: true })
  isActive?: boolean;

  @OneToMany(() => CommentEntity, (comment) => comment.bankProduct)
  comments?: CommentEntity[];
}
