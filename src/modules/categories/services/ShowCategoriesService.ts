import { injectable, inject } from 'tsyringe';

import ICategoriesRepository from '../repositories/ICategoriesRepository';
import Category from '../infra/typeorm/entities/Category';

@injectable()
class ShowCategoriesService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(): Promise<Category[]> {
    const categories = this.categoriesRepository.findAll();
    return categories;
  }
}

export default ShowCategoriesService;
