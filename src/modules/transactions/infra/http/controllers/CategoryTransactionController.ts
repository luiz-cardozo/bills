import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowCategoryTransactionsService from '@modules/transactions/services/ShowCategoryTransactionsService';

export default class CategoryTranscationController {
  public async show(req: Request, res: Response): Promise<Response> {
    const showCategoryTransactions = container.resolve(
      ShowCategoryTransactionsService,
    );
    const transactions = await showCategoryTransactions.execute();
    return res.json(transactions);
  }
}
