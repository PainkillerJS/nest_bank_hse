import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { compare, genSalt, hash } from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  private getUserFields<T extends keyof InstanceType<typeof UserEntity>>(
    user: UserEntity,
    keysFromUserObject: T[],
  ): { [P in T]: UserEntity[P] } {
    const result = {} as { [P in T]: UserEntity[P] };

    for (const key of keysFromUserObject) {
      result[key] = user[key];
    }

    return result;
  }

  private async validateUser({
    email,
    password,
  }: Omit<AuthDto, 'role' | 'name'>) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      select: ['id', 'email', 'password'],
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Неправильный пароль');
    }

    return user;
  }

  private async createAccessToken(payload: Pick<UserEntity, 'id' | 'role'>) {
    return this.jwtService.signAsync(payload, {
      expiresIn: '30d',
    });
  }

  async register({ email, password, ...rest }: AuthDto) {
    await this.userService.isCheckUserByEmail(email);

    const salt = await genSalt(10);

    const newUser = await this.userRepository.create({
      email,
      password: await hash(password, salt),
      ...rest,
    });

    const [user, accessToken] = await Promise.allSettled([
      this.userRepository.save(newUser),
      this.createAccessToken(this.getUserFields(newUser, ['id', 'role'])),
    ]);

    if (user.status === 'rejected' || accessToken.status === 'rejected') {
      throw new BadRequestException('Ошибка в создании нового пользователя');
    }

    return {
      user: this.getUserFields(user.value, ['id', 'email']),
      accessToken: accessToken.value,
    };
  }

  async login(dto: Omit<AuthDto, 'role' | 'name'>) {
    const user = await this.validateUser(dto);

    return {
      user: this.getUserFields(user, ['id', 'email']),
      accessToken: await this.createAccessToken({
        id: user.id,
        role: user.role,
      }),
    };
  }
}
