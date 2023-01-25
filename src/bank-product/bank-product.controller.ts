import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BankProductService } from './bank-product.service';
import { BankProductDto } from './dto/bank-product.dto';
import { Roles } from '../auth/decorators/role.decorator';
import { ROLE } from '../user/entities/user.entity';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('bank-product')
export class BankProductController {
  constructor(private readonly bankProductService: BankProductService) {}

  @HttpCode(200)
  @Get()
  async getAllBankProduct() {
    return this.bankProductService.getAllBankProduct();
  }

  @HttpCode(200)
  @Get('find-by-tag')
  async findBankProductByTag(@Query('tag') tag: string) {
    return this.bankProductService.findByTag(tag);
  }
  @HttpCode(200)
  @Get(':id')
  async getBankProductById(@Param('id', ParseIntPipe) id: number) {
    return this.bankProductService.getBankProductById(id);
  }

  @UsePipes(new ValidationPipe())
  @Roles(ROLE.ADMIN)
  @Auth()
  @HttpCode(200)
  @Post('create')
  async createBankProduct(@Body() dto: BankProductDto) {
    return this.bankProductService.createBankProduct(dto);
  }

  @UsePipes(new ValidationPipe())
  @Roles(ROLE.ADMIN)
  @Auth()
  @HttpCode(200)
  @Put('update/:id')
  async updateBankProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<BankProductDto>,
  ) {
    return this.bankProductService.updateBankProduct(id, dto);
  }

  @Roles(ROLE.ADMIN)
  @Auth()
  @HttpCode(200)
  @Delete(':id')
  async deleteBankProduct(@Param('id', ParseIntPipe) id: number) {
    return this.bankProductService.deleteBankProduct(id);
  }
}
