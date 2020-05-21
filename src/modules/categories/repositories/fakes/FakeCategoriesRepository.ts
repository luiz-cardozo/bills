import { uuid } from 'uuidv4';
import Category from '@modules/categories/infra/typeorm/entities/Category';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';

interface IRequest {
  name: string;
}

class FakeCategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  public async create(name: string): Promise<Category> {
    const category = new Category();

    Object.assign(category, { id: uuid(), name });

    this.categories.push(category);

    return category;
  }

  public async findByCategoryName(name: string): Promise<Category | undefined> {
    const checkCategoryExists = this.categories.find(
      category => category.name === name,
    );

    return checkCategoryExists;
  }

  public async findAll(): Promise<Category[]> {
    return this.categories;
  }
}

export default FakeCategoriesRepository;
