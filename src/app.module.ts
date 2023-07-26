import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppService } from './app.service';
import { ListsModule } from './lists/lists.module';
import { List } from './lists/entities/list.entity';

@Module({
  imports: [
    ListsModule,
    SequelizeModule.forRoot({
      autoLoadModels: true, // feature for dev
      dialect: 'sqlite',
      host: ':memory',
      models: [List],
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
