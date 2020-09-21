import { Repository, getRepository, Between } from 'typeorm';
import { startOfMonth, endOfMonth } from 'date-fns';

import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';
import IBalance from '@modules/transactions/dtos/IBalanceDTO';
import ISumCategoryTransactions from '@modules/transactions/dtos/ISumCategoryTransactions';
import User from '@modules/users/infra/typeorm/entities/User';

class TransactionsRepository implements ITransactionsRepository {
  private ormRepository: Repository<Transaction>;

  private userRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
    this.userRepository = getRepository(User);
  }

  public async getApportionedTransactions(searchDate: Date): Promise<any> {
    const monthStart = startOfMonth(searchDate);
    const monthEnd = endOfMonth(searchDate);

    const user = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.name as name', 'user.id as id'])
      .addSelect('sum(transaction.value) as total')
      .innerJoin(Transaction, 'transaction', 'user.id = transaction.user_id')
      .andWhere('transaction.type = :type', { type: 'outcome' })
      .andWhere('transaction.apportionment = :apportionment', {
        apportionment: 'shared',
      })
      .andWhere('transaction.date BETWEEN :start AND :end', {
        start: monthStart,
        end: monthEnd,
      })
      .groupBy('user.name, user.id')
      .getRawMany();

    return user;
  }

  public async getBalance(searchDate: Date): Promise<IBalance> {
    const monthStart = startOfMonth(searchDate);
    const monthEnd = endOfMonth(searchDate);

    const transactions = await this.ormRepository.find({
      where: {
        date: Between(monthStart, monthEnd),
      },

      relations: ['user'],
    });

    const { income, outcome } = transactions.reduce(
      (accumulator: IBalance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += Number(transaction.value);
            break;
          case 'outcome':
            accumulator.outcome += Number(transaction.value);
            break;
          default:
            break;
        }
        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;
    return { income, outcome, total };
  }

  public async findById(
    transaction_id: string,
  ): Promise<Transaction | undefined> {
    const transaction = await this.ormRepository.findOne(transaction_id);
    return transaction;
  }

  public async findByDate(
    searchDate: Date,
  ): Promise<Transaction[] | undefined> {
    const monthStart = startOfMonth(searchDate);
    const monthEnd = endOfMonth(searchDate);

    const transactions = await this.ormRepository.find({
      select: ['id', 'title', 'type', 'value', 'apportionment', 'date'],
      where: {
        date: Between(monthStart, monthEnd),
      },
      order: {
        value: 'DESC',
      },
      relations: ['user', 'category'],
    });

    return transactions;
  }

  // TODO filter by date
  public async findCategorizedTransactions(): Promise<
    ISumCategoryTransactions[]
  > {
    const transactions = await this.ormRepository.query(
      "select category_id, sum(value) as total, c.name from (select value, category_id from transactions where type='outcome') as t join (select id, name from categories) as c on  c.id = t.category_id group by c.name, t.category_id order by sum(value) desc limit 3",
    );

    return transactions;
  }

  public async findAll(): Promise<Transaction[]> {
    const transactions = await this.ormRepository.find({ relations: ['user'] });
    return transactions;
  }

  public async create({
    title,
    description,
    type,
    value,
    category_id,
    user_id,
    apportionment,
    date,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = this.ormRepository.create({
      title,
      description,
      type,
      value,
      category_id,
      user_id,
      apportionment,
      date,
    });

    await this.ormRepository.save(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
