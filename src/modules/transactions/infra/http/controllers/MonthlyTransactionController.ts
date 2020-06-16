import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { parseISO } from 'date-fns';
import ShowMonthlyTransactionsService from '../../../services/ShowMonthlyTransactionsService';
import ShowMonthlyBalanceService from '../../../services/ShowMonthlyBalanceService';

export default class MonthlyTranscationController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { date } = req.body;
    const showMonthlyTransactions = container.resolve(
      ShowMonthlyTransactionsService,
    );
    const showMonthlyBalanceService = container.resolve(
      ShowMonthlyBalanceService,
    );

    const searchDate = typeof date === 'string' ? parseISO(date) : new Date();

    const transactionsData = await showMonthlyTransactions.execute(searchDate);
    const transactions = classToClass(transactionsData);

    const balance = await showMonthlyBalanceService.execute(searchDate);

    return res.json({
      transactions,
      balance,
    });
  }
}
