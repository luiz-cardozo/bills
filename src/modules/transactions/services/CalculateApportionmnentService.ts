import { injectable, inject } from 'tsyringe';
import Transaction from '../infra/typeorm/entities/Transaction';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

@injectable()
class CalculateApportionmentService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  async execute(searchDate: Date): Promise<Transaction[]> {
    const outcomeTransactions = await this.transactionsRepository.getApportionedTransactions(
      searchDate,
    );

    return outcomeTransactions;
  }
}

export default CalculateApportionmentService;
