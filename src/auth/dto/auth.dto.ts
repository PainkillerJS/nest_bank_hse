import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ROLE } from '../../user/entities/user.entity';

export class AuthDto {
  @IsEmail()
  email: string;

  @MinLength(6, {
    message: 'Не менее 6 символов',
  })
  @IsString()
  password: string;

  @IsString({ message: 'Нужно ввести имя' })
  name: string;

  @IsOptional()
  @IsEnum(ROLE, { message: 'Выбрана неверная роль' })
  role: ROLE;
}
