import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';

import ITransactionsRepository from '../repositories/ITransactionsRepository';
import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import Transaction from '../infra/typeorm/entities/Transaction';

@injectable()
class CreateTransactionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute({
    title,
    description,
    type,
    value,
    category_id,
    user_id,
    apportionment,
    date,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const checkUserExists = await this.usersRepository.findById(user_id);

    if (!checkUserExists) {
      throw new AppError('User does not exists');
    }

    const checkCategoryExists = await this.categoriesRepository.findById(
      category_id,
    );

    if (!checkCategoryExists) {
      throw new AppError('Category does not exists');
    }

    const transaction = await this.transactionsRepository.create({
      title,
      description,
      type,
      value,
      category_id,
      user_id,
      apportionment,
      date,
    });

    return transaction;
  }
}

export default CreateTransactionService;
