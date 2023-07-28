import { NotFoundException } from '@nestjs/common';
import { List } from '../../entities';
import { ListGatewayInterface } from '../ports';

export class ListGatewayInMemory implements ListGatewayInterface {
  items: List[] = [];

  async create(list: List): Promise<List> {
    list.id = this.items.length + 1;
    this.items.push(list);
    return list;
  }

  async findAll(): Promise<List[]> {
    return this.items;
  }

  async findById(id: number): Promise<List> {
    const listItem = this.items.find((item) => item.id === id);
    if (!listItem) throw new NotFoundException('Item not found');
    return listItem;
  }
}
