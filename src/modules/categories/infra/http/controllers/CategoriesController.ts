import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCategoriesService from '@modules/categories/services/CreateCategoriesService';
import ShowCategoriesService from '@modules/categories/services/ShowCategoriesService';

export default class CategoriesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    const createCategory = container.resolve(CreateCategoriesService);

    const category = await createCategory.execute({ name });

    return res.json(category);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const showCategories = container.resolve(ShowCategoriesService);
    const categories = await showCategories.execute();
    return res.json(categories);
  }
}
