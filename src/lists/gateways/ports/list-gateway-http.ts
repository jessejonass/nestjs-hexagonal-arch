import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ListGatewayInterface } from './list-gateway-interface';
import { List } from '../../entities';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ListGatewayHttp implements ListGatewayInterface {
  constructor(
    @Inject(HttpService)
    private httpService: HttpService,
  ) {}

  async create(list: List): Promise<List> {
    await lastValueFrom(
      this.httpService.post('lists', {
        name: list.name,
      }),
    );
    return list;
  }

  async findAll(): Promise<List[]> {
    const { data } = await lastValueFrom(this.httpService.get<List[]>('lists'));
    return data.map((d) => new List(d.name, d.id));
  }

  async findById(id: number): Promise<List> {
    const { data } = await lastValueFrom(
      this.httpService.get<List>(`lists/${id}`),
    );
    return new List(data.name, data.id);
  }
}
