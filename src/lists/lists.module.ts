import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { ListModel } from './entities/list.model';
import { ListGatewayHttp, ListGatewaySequelizeAdapter } from './gateways';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'http://localhost:8000',
    }),
    SequelizeModule.forFeature([ListModel]),
  ],
  controllers: [ListsController],
  providers: [
    ListsService,
    ListGatewaySequelizeAdapter,
    ListGatewayHttp,
    // {},
    {
      provide: 'ListPersistenceGatewayInterface',
      useExisting: ListGatewaySequelizeAdapter,
    },
    {
      provide: 'ListsIntegrationGateway',
      useExisting: ListGatewayHttp,
    },
  ],
})
export class ListsModule {}
