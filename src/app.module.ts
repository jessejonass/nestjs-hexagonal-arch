import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppService } from './app.service';
import { ListsModule } from './lists/lists.module';
import { ListModel } from './lists/entities/list.model';

@Module({
  imports: [
    ListsModule,
    SequelizeModule.forRoot({
      autoLoadModels: true, // feature for dev
      dialect: 'sqlite',
      host: ':memory',
      models: [ListModel],
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
