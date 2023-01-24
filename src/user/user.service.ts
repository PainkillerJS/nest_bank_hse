import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async isCheckUserByEmail(
    email: UserEntity['email'],
  ): Promise<true | BadRequestException> {
    const oldUser = await this.userRepository.findOneBy({
      email,
    });

    if (oldUser) {
      return new BadRequestException('Email Занят');
    }

    return true;
  }
}
