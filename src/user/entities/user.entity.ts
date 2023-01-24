import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/utils/Base.entity';

export enum ROLE {
  ADMIN = 'ADMIN',
  GUEST = 'GUEST',
}

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ROLE,
    default: ROLE.GUEST,
  })
  role: ROLE;
}
