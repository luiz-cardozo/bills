import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import ITransactionsRepository from '../repositories/ITransactionsRepository';
import Transaction from '../infra/http/typeorm/entities/Transaction';

interface IRequest {
  title: string;
  description?: string;
  value: number;
  category_id: string;
  apportionment: 'personal' | 'shared';
  date: Date;
  transaction_id: string;
}

@injectable()
class UpdateTransactionService {
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
    value,
    category_id,
    apportionment,
    date,
    transaction_id,
  }: IRequest): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findById(
      transaction_id,
    );
    if (!transaction) {
      throw new AppError('Transaction not found');
    }

    const categoryExists = await this.categoriesRepository.findById(
      category_id,
    );

    if (!categoryExists) {
      throw new AppError('Category not found');
    }

    if (description) {
      transaction.description = description;
    }

    transaction.title = title;
    transaction.value = value;
    transaction.category_id = category_id;
    transaction.apportionment = apportionment;
    transaction.date = date;

    return transaction;
  }
}

export default UpdateTransactionService;
