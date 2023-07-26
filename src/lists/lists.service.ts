import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ListsService {
  constructor(
    @InjectModel(List)
    private listModel: typeof List,
    private httpService: HttpService,
  ) {}

  async create(createListDto: CreateListDto) {
    const list = await this.listModel.create(createListDto);

    try {
      await lastValueFrom(
        this.httpService.post('lists', {
          id: list.id,
          name: list.name,
          createdAt: list.createdAt,
          updatedAt: list.updatedAt,
        }),
      );
    } catch {
      throw new BadRequestException('Error to create list item');
    }

    return list;
  }

  async findAll() {
    return await this.listModel.findAll();
  }

  async findOne(id: number) {
    const item = await this.listModel.findByPk(id);

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    return item;
  }

  update(id: number, updateListDto: UpdateListDto) {
    return `This action updates a #${id} list`;
  }

  remove(id: number) {
    return `This action removes a #${id} list`;
  }
}
