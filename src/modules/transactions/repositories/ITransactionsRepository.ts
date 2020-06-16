import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import Transaction from '../infra/typeorm/entities/Transaction';
import IBalance from '../dtos/IBalanceDTO';
import ISumCategoryTransactions from '../dtos/ISumCategoryTransactions';

export default interface ITransactionsRepository {
  create(data: ICreateTransactionDTO): Promise<Transaction>;
  findAll(): Promise<Transaction[] | undefined>;
  findById(transaction_id: string): Promise<Transaction | undefined>;
  findByDate(searchDate: Date): Promise<Transaction[] | undefined>;
  getBalance(searchDate: Date): Promise<IBalance | undefined>;
  findCategorizedTransactions(): Promise<
    ISumCategoryTransactions[] | undefined
  >;
  getApportionedTransactions(searchDate: Date): Promise<any>;
}
