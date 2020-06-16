import FakeCategoriesRepository from '@modules/categories/repositories/fakes/FakeCategoriesRepository';
import ShowCategoryService from '@modules/categories/services/ShowCategoriesService';
import CreateCategoriesService from '@modules/categories/services/CreateCategoriesService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let showCategories: ShowCategoryService;
let createCategories: CreateCategoriesService;

describe('ShowCategories', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    createCategories = new CreateCategoriesService(fakeCategoriesRepository);
    showCategories = new ShowCategoryService(fakeCategoriesRepository);
  });

  it('should be able to list all the categories', async () => {
    const cateogory1 = await createCategories.execute({ name: 'Food' });
    const cateogory2 = await createCategories.execute({ name: 'Living' });
    const cateogory3 = await createCategories.execute({
      name: 'Entertainement',
    });

    const categories = await showCategories.execute();

    expect(categories).toEqual([cateogory1, cateogory2, cateogory3]);
  });
});
