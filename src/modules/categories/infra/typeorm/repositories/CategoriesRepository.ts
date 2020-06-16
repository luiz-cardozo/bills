import { Repository, getRepository } from 'typeorm';

import Category from '@modules/categories/infra/typeorm/entities/Category';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';

class CateogriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async create(name: string): Promise<Category> {
    const category = this.ormRepository.create({ name });
    await this.ormRepository.save(category);

    return category;
  }

  public async findByCategoryName(name: string): Promise<Category | undefined> {
    const category = this.ormRepository.findOne({ where: { name } });
    return category;
  }

  public async findAll(): Promise<Category[]> {
    const categories = this.ormRepository.find();
    return categories;
  }

  public async findById(category_id: string): Promise<Category | undefined> {
    const category = this.ormRepository.findOne(category_id);
    return category;
  }
}

export default CateogriesRepository;
