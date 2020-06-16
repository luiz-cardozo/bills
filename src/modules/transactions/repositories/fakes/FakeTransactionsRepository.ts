import { uuid } from 'uuidv4';
import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';
import Transaction from '@modules/transactions/infra/http/typeorm/entities/Transaction';
import ITransactionsRepository from '../ITransactionsRepository';

class FakeTransactionsRepository implements ITransactionsRepository {
  private transactions: Transaction[] = [];

  public async create(data: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = new Transaction();
    Object.assign(transaction, { id: uuid() }, data);
    this.transactions.push(transaction);
    return transaction;
  }

  public async findAll(): Promise<Transaction[]> {
    return this.transactions;
  }

  public async findById(
    transaction_id: string,
  ): Promise<Transaction | undefined> {
    const transactionExists = this.transactions.find(
      transaction => transaction.id === transaction_id,
    );
    return transactionExists;
  }
}

export default FakeTransactionsRepository;
