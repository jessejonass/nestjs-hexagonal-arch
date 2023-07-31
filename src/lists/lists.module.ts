import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { ListModel } from './entities/list.model';
import { ListGatewayHttp, ListGatewaySequelizeAdapter } from './gateways';
// import { CreateListInCrmListener } from './listeners';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'http://localhost:8000',
    }),
    BullModule.registerQueue({
      name: 'default',
      defaultJobOptions: { attempts: 1 },
    }),
    SequelizeModule.forFeature([ListModel]),
  ],
  controllers: [ListsController],
  providers: [
    ListsService,
    ListGatewaySequelizeAdapter,
    ListGatewayHttp,
    // CreateListInCrmListener,
    {
      provide: 'ListPersistenceGatewayInterface',
      useExisting: ListGatewaySequelizeAdapter,
    },
    {
      provide: 'ListsIntegrationGateway',
      useExisting: ListGatewayHttp,
    },
    {
      provide: 'EventEmitter',
      useExisting: EventEmitter2,
    },
  ],
})
export class ListsModule {}
