import type { FindManyOptions } from 'typeorm';
import { BankProductEntity } from '../entities/bank-product.entity';

export const getOptionsForFindBankProduct = (
  isFindAll = true,
): FindManyOptions<BankProductEntity> => {
  return {
    relations: {
      comments: {
        user: true,
      },
    },
    select: {
      id: true,
      name: true,
      description: true,
      comments: {
        message: true,
        user: { name: true },
        id: true,
      },
      isActive: true,
    },

    ...(isFindAll
      ? {
          order: {
            createdAt: 'DESC',
          },
        }
      : {}),
  };
};
