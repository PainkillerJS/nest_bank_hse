import { BaseEntity } from '../../common/utils/Base.entity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { BankProductEntity } from '../../bank-product/entities/bank-product.entity';

@Entity('comment')
export class CommentEntity extends BaseEntity {
  @Column()
  message: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @ManyToOne(() => BankProductEntity, (bankProduct) => bankProduct.comments)
  @JoinColumn({ name: 'bank_product' })
  bankProduct: BankProductEntity;
}
