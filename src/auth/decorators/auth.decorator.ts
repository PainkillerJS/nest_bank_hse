import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';

export const Auth = () => UseGuards(AuthGuard('jwt'), RolesGuard);
