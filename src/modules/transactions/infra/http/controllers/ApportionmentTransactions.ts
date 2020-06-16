import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { parseISO } from 'date-fns';
import CalculateApportionmnentService from '../../../services/CalculateApportionmnentService';

export default class MonthlyTranscationController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { date } = req.body;
    const showApportionedTransactions = container.resolve(
      CalculateApportionmnentService,
    );

    const searchDate = typeof date === 'string' ? parseISO(date) : new Date();

    const transactionsData = await showApportionedTransactions.execute(
      searchDate,
    );
    const transactions = classToClass(transactionsData);

    return res.json(transactions);
  }
}
