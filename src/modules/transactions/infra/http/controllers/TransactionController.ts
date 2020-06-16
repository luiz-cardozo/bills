import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import ShowTransactionsService from '@modules/transactions/services/ShowTransactionsService';
import CreateTransactionService from '@modules/transactions/services/CreateTransactionService';
import DeleteTransactionService from '@modules/transactions/services/DeleteTransactionService';

export default class TranscationController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      title,
      description,
      type,
      value,
      category_id,
      apportionment,
      date,
    } = req.body;
    const user_id = req.user.id;

    const createTransaction = container.resolve(CreateTransactionService);
    const transaction = await createTransaction.execute({
      title,
      description,
      type,
      value,
      category_id,
      user_id,
      apportionment,
      date,
    });

    return res.json(transaction);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    // const { transaction_id } = req.params;
    // const deleteTransaction = container.resolve(DeleteTransactionService);
    // await deleteTransaction(transaction_id);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const showTransactions = container.resolve(ShowTransactionsService);
    const transactions = await showTransactions.execute();
    return res.json(classToClass(transactions));
  }

  // public async update(req: Request, res: Response): Promise<Response> {}
}
