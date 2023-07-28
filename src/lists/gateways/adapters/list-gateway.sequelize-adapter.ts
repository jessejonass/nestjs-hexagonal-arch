import { InjectModel } from '@nestjs/sequelize';
import { List } from '../../entities';
import { ListModel } from '../../entities';
import { ListGatewayInterface } from '../ports';
import { NotFoundError } from 'rxjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListGatewaySequelizeAdapter implements ListGatewayInterface {
  constructor(
    @InjectModel(ListModel)
    private listModel: typeof ListModel,
  ) {}

  async create(list: List): Promise<List> {
    const newList = await this.listModel.create(list);
    list.id = newList.id;
    return list;
  }

  async findAll(): Promise<List[]> {
    const listsModels = await this.listModel.findAll();
    return listsModels.map(
      (listModel) => new List(listModel.name, listModel.id),
    );
  }

  async findById(id: number): Promise<List> {
    const listModel = await this.listModel.findByPk(id);
    if (!listModel) throw new NotFoundError('List not found');
    return new List(listModel.name, listModel.id);
  }
}
