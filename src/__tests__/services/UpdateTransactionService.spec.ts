import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeTransactionsRepository from '@modules/transactions/repositories/fakes/FakeTransactionsRepository';
import UpdateTransactionsService from '@modules/transactions/services/UpdateTransactionService';
import AppError from '@shared/errors/AppError';
import FakeCategoriesRepository from '@modules/categories/repositories/fakes/FakeCategoriesRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeTransactionsRepository: FakeTransactionsRepository;
let fakeCategoriesRepository: FakeCategoriesRepository;
let updateTransactions: UpdateTransactionsService;

describe('UpdateTransaction', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();
    fakeTransactionsRepository = new FakeTransactionsRepository();
    updateTransactions = new UpdateTransactionsService(
      fakeUsersRepository,
      fakeCategoriesRepository,
      fakeTransactionsRepository,
    );
  });

  it('should be able to update the transaction', async () => {
    const category = await fakeCategoriesRepository.create('living');

    const today = new Date();

    const transaction = await fakeTransactionsRepository.create({
      title: 'Rents',
      category_id: 'something',
      apportionment: 'shared',
      date: today,
      user_id: 'user-id',
      value: 1300,
    });

    const updatedTransaction = await updateTransactions.execute({
      title: 'Rent',
      description: 'apartment',
      category_id: category.id,
      date: today,
      value: 1350,
      apportionment: 'shared',
      transaction_id: transaction.id,
    });

    expect(updatedTransaction.title).toBe('Rent');
    expect(updatedTransaction.description).toBe('apartment');
    expect(updatedTransaction.category_id).toBe(category.id);
    expect(updatedTransaction.date).toBe(today);
    expect(updatedTransaction.user_id).toBe(transaction.user_id);
    expect(updatedTransaction.value).toBe(1350);
  });

  it('should be able to update the transaction without description', async () => {
    const category = await fakeCategoriesRepository.create('living');

    const today = new Date();

    const transaction = await fakeTransactionsRepository.create({
      title: 'Rents',
      category_id: 'something',
      apportionment: 'shared',
      date: today,
      user_id: 'user-id',
      value: 1300,
    });

    const updatedTransaction = await updateTransactions.execute({
      title: 'Rent',
      category_id: category.id,
      date: today,
      value: 1350,
      apportionment: 'shared',
      transaction_id: transaction.id,
    });

    expect(updatedTransaction.title).toBe('Rent');
    expect(updatedTransaction.category_id).toBe(category.id);
    expect(updatedTransaction.date).toBe(today);
    expect(updatedTransaction.user_id).toBe(transaction.user_id);
    expect(updatedTransaction.value).toBe(1350);
  });

  it('should not be able to update a transaction with an invalid category', async () => {
    const today = new Date();

    const transaction = await fakeTransactionsRepository.create({
      title: 'Rents',
      category_id: 'something',
      apportionment: 'shared',
      date: today,
      user_id: 'user-id',
      value: 1300,
    });

    await expect(
      updateTransactions.execute({
        title: 'Rent',
        description: 'apartment',
        category_id: 'invalid-category',
        date: today,
        value: 1350,
        apportionment: 'shared',
        transaction_id: transaction.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a transaction with an invalid category', async () => {
    await expect(
      updateTransactions.execute({
        title: 'Rent',
        description: 'apartment',
        category_id: 'invalid-category',
        date: new Date(),
        value: 1350,
        apportionment: 'shared',
        transaction_id: 'transaction-not-found',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
