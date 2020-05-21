import Category from '../infra/typeorm/entities/Category';

export default interface ICategoriesRepository {
  create(name: string): Promise<Category>;
  findByCategoryName(name: string): Promise<Category | undefined>;
  findAll(): Promise<Category[]>;
}
