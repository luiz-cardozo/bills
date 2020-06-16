import FakeTransactionsRepository from '@modules/transactions/repositories/fakes/FakeTransactionsRepository';
import ShowTransactionsService from '@modules/transactions/services/ShowTransactionsService';

let fakeTransactionsRepository: FakeTransactionsRepository;
let showTransactions: ShowTransactionsService;

describe('ShowTransactions', () => {
  beforeEach(() => {
    fakeTransactionsRepository = new FakeTransactionsRepository();
    showTransactions = new ShowTransactionsService(fakeTransactionsRepository);
  });

  it('should be able to create a transaction', async () => {
    const transaction1 = await fakeTransactionsRepository.create({
      title: 'Rent',
      description: 'apartment',
      value: 1300,
      category_id: 'living-id',
      user_id: 'user-id',
      apportionment: 'shared',
      date: new Date(),
    });

    const transaction2 = await fakeTransactionsRepository.create({
      title: 'Electric',
      value: 70,
      category_id: 'living-id',
      user_id: 'user-id',
      apportionment: 'shared',
      date: new Date(),
    });

    const transaction3 = await fakeTransactionsRepository.create({
      title: 'Gas',
      value: 10,
      category_id: 'living-id',
      user_id: 'user-id',
      apportionment: 'shared',
      date: new Date(),
    });

    const transactions = await showTransactions.execute();

    expect(transactions).toEqual([transaction1, transaction2, transaction3]);
  });
});
