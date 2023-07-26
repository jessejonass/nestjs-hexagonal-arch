import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { List } from './entities/list.entity';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'http://localhost:8000',
    }),
    SequelizeModule.forFeature([List]),
  ],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}
