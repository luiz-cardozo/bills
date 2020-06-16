import { injectable, inject } from 'tsyringe';
import ITransactionsRepository from '../repositories/ITransactionsRepository';
import IBalance from '../dtos/IBalanceDTO';

@injectable()
class ShowMonthlyBalanceService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  async execute(searchDate: Date): Promise<IBalance | undefined> {
    const balance = this.transactionsRepository.getBalance(searchDate);

    return balance;
  }
}

export default ShowMonthlyBalanceService;
