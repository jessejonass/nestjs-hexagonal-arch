import { Inject, Injectable } from '@nestjs/common';
import { ListCreatedEvent } from '../events';
import { ListGatewayInterface } from '../gateways';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class CreateListInCrmListener {
  constructor(
    @Inject('ListsIntegrationGateway')
    private listIntegrationGateway: ListGatewayInterface,
  ) {}

  @OnEvent('list.created')
  async handle(event: ListCreatedEvent) {
    this.listIntegrationGateway.create(event.list);
  }
}
