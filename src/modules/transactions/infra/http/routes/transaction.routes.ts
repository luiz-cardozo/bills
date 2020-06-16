import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import TransactionController from '../controllers/TransactionController';
import MonthlyTransactionController from '../controllers/MonthlyTransactionController';
import CategoryTransactionController from '../controllers/CategoryTransactionController';
import ApportionmentTransactionController from '../controllers/ApportionmentTransactions';

const transactionsRouter = Router();
const transactionsController = new TransactionController();
const monthlyTransactionController = new MonthlyTransactionController();
const categoryTransactionController = new CategoryTransactionController();
const apportionmentTransactionController = new ApportionmentTransactionController();

transactionsRouter.use(ensureAuthenticated);

transactionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string(),
      type: Joi.string().valid('income', 'outcome').required(),
      value: Joi.number(),
      category_id: Joi.string().uuid().required(),
      apportionment: Joi.string().valid('shared', 'personal').required(),
      date: Joi.date().required(),
    },
  }),
  transactionsController.create,
);

transactionsRouter.get('/', transactionsController.show);

transactionsRouter.get(
  '/monthly',
  celebrate({
    [Segments.BODY]: {
      date: Joi.date(),
    },
  }),
  monthlyTransactionController.show,
);

transactionsRouter.get('/categorized', categoryTransactionController.show);

transactionsRouter.get(
  '/apportionment',
  apportionmentTransactionController.show,
);

export default transactionsRouter;
