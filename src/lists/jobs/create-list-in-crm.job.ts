import { OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';
import { ListGatewayInterface } from '../gateways';
import { ListCreatedEvent } from '../events';

@Processor()
export class CreateListInCrmJob {
  constructor(
    @Inject('ListsIntegrationGateway')
    private listsIntegrationGateway: ListGatewayInterface,
  ) {}

  @Process('list.created')
  async handle(job: Job<ListCreatedEvent>) {
    console.log('job processing...', job.data);
    const event = job.data;
    await this.listsIntegrationGateway.create(event.list);
  }

  @OnQueueFailed({ name: 'list.created' })
  handleError(error: Error) {
    console.error('CreateListInCrmJob', error);
  }
}
