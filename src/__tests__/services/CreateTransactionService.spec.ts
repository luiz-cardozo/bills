import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeTransactionsRepository from '@modules/transactions/repositories/fakes/FakeTransactionsRepository';
import CreateTransactionsService from '@modules/transactions/services/CreateTransactionService';
import AppError from '@shared/errors/AppError';
import FakeCategoriesRepository from '@modules/categories/repositories/fakes/FakeCategoriesRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeTransactionsRepository: FakeTransactionsRepository;
let fakeCategoriesRepository: FakeCategoriesRepository;
let createTransactions: CreateTransactionsService;

describe('Transactions', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();
    fakeTransactionsRepository = new FakeTransactionsRepository();
    createTransactions = new CreateTransactionsService(
      fakeUsersRepository,
      fakeCategoriesRepository,
      fakeTransactionsRepository,
    );
  });

  it('should be able to create a transaction', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    const category = await fakeCategoriesRepository.create('living');

    const today = new Date();
    const transaction = await createTransactions.execute({
      title: 'Rent',
      description: 'apartment',
      category_id: category.id,
      apportionment: 'shared',
      date: today,
      user_id: user.id,
      value: 1300,
    });

    expect(transaction).toHaveProperty('id');
    expect(transaction.title).toBe('Rent');
    expect(transaction.description).toBe('apartment');
    expect(transaction.category_id).toBe(category.id);
    expect(transaction.apportionment).toBe('shared');
    expect(transaction.date).toBe(today);
    expect(transaction.user_id).toBe(user.id);
    expect(transaction.value).toBe(1300);
  });

  it('should not be able to create a transaction without a valid user', async () => {
    await expect(
      createTransactions.execute({
        title: 'Rent',
        description: 'apartment',
        category_id: 'living-category-id',
        apportionment: 'shared',
        date: new Date(),
        user_id: 'without-valid-user',
        value: 1300,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a transaction without a valid category', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    await expect(
      createTransactions.execute({
        title: 'Rent',
        description: 'apartment',
        category_id: 'invalid-category-id',
        apportionment: 'shared',
        date: new Date(),
        user_id: user.id,
        value: 1300,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
