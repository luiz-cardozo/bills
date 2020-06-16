import FakeCategoriesRepository from '@modules/categories/repositories/fakes/FakeCategoriesRepository';
import CreateCategoriesService from '@modules/categories/services/CreateCategoriesService';
import AppError from '@shared/errors/AppError';

let fakeCategoriesRepository: FakeCategoriesRepository;
let createCategories: CreateCategoriesService;

describe('Categories', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    createCategories = new CreateCategoriesService(fakeCategoriesRepository);
  });

  it('should be able to create a new category', async () => {
    const category = await createCategories.execute({ name: 'Food' });

    expect(category).toHaveProperty('id');
    expect(category.name).toBe('Food');
  });

  it('should not be able to create a duplicate category', async () => {
    await createCategories.execute({ name: 'Food' });
    await expect(
      createCategories.execute({ name: 'Food' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
