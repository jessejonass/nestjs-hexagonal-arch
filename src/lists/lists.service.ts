import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';
import { ListGatewayInterface } from './gateways';

@Injectable()
export class ListsService {
  constructor(
    @Inject('ListPersistenceGatewayInterface')
    private listPersistenceGateway: ListGatewayInterface, // porta -> nao dep. do sequelize

    @Inject('ListsIntegrationGateway')
    private listsIntegrationGateway: ListGatewayInterface,
  ) {}

  async create(createListDto: CreateListDto) {
    const list = new List(createListDto.name);
    await this.listPersistenceGateway.create(list);
    await this.listsIntegrationGateway.create(list);
    return list;
  }

  async findAll() {
    return await this.listsIntegrationGateway.findAll();
  }

  async findOne(id: number) {
    const item = await this.listsIntegrationGateway.findById(id);

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    return item;
  }

  update(id: number, updateListDto: UpdateListDto) {
    return `This action updates a #${id} list with Dto: ${updateListDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} list`;
  }
}
