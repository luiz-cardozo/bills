import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import ICategoriesRepository from '../repositories/ICategoriesRepository';
import Category from '../infra/typeorm/entities/Category';

interface IRequest {
  name: string;
}

@injectable()
class CreateCategoriesService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ name }: IRequest): Promise<Category> {
    const checkCategoryExists = await this.categoriesRepository.findByCategoryName(
      name,
    );

    if (checkCategoryExists) {
      throw new AppError('Category already exists');
    }
    const category = await this.categoriesRepository.create(name);

    return category;
  }
}

export default CreateCategoriesService;
