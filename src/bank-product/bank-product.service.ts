import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankProductEntity } from './entities/bank-product.entity';
import { In, Repository } from 'typeorm';
import { BankProductDto } from './dto/bank-product.dto';

import { getOptionsForFindBankProduct } from './helpers/getOptionsForFindBankProduct';

@Injectable()
export class BankProductService {
  constructor(
    @InjectRepository(BankProductEntity)
    private readonly bankProductRepository: Repository<BankProductEntity>,
  ) {}

  async getAllBankProduct() {
    return this.bankProductRepository.find(getOptionsForFindBankProduct());
  }

  async getBankProductById(productId: BankProductEntity['id']) {
    return this.bankProductRepository.findOne({
      ...getOptionsForFindBankProduct(false),
      where: { id: productId },
    });
  }

  async findByTag(tag: string) {
    const bankProduct = await this.getAllBankProduct();

    return bankProduct.filter(({ tags }) =>
      tags.map((tag) => tag.toLowerCase()).includes(tag.toLowerCase()),
    );
  }

  async createBankProduct(dto: BankProductDto) {
    const existBank = await this.bankProductRepository.findOneBy({
      name: dto.name,
    });

    if (existBank) {
      throw new BadRequestException('Такое имя уже занято');
    }

    const newVideo = this.bankProductRepository.create(dto);

    return await this.bankProductRepository.save(newVideo);
  }

  async updateBankProduct(
    id: BankProductEntity['id'],
    dto: Partial<BankProductDto>,
  ) {
    const bankProduct = await this.bankProductRepository.findOneBy({ id });

    console.log(bankProduct);

    if (!bankProduct) {
      throw new NotFoundException('Такого продукта не существует');
    }

    return this.bankProductRepository.save({ ...bankProduct, ...dto });
  }

  async deleteBankProduct(id: BankProductEntity['id']) {
    return this.bankProductRepository.delete({ id });
  }
}
