import { inject, injectable } from 'tsyringe';
import ITransactionsRepository from '../repositories/ITransactionsRepository';

@injectable()
class DeleteTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute(transaction_id: string): Promise<void> {}
}

export default DeleteTransactionService;
