import { injectable, inject } from 'tsyringe';
import ITransactionsRepository from '../repositories/ITransactionsRepository';
import Transaction from '../infra/typeorm/entities/Transaction';

@injectable()
class ShowMonthlyTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  async execute(searchDate: Date): Promise<Transaction[] | undefined> {
    const transactions = this.transactionsRepository.findByDate(searchDate);
    return transactions;
  }
}

export default ShowMonthlyTransactionsService;
