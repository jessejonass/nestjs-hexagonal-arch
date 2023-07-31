import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppService } from './app.service';
import { ListsModule } from './lists/lists.module';
import { ListModel } from './lists/entities/list.model';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ListsModule,
    EventEmitterModule.forRoot(),
    SequelizeModule.forRoot({
      autoLoadModels: true, // feature for dev
      dialect: 'sqlite',
      host: ':memory',
      models: [ListModel],
    }),
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
