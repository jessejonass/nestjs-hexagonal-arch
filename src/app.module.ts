import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ListsModule } from './lists/lists.module';

@Module({
  imports: [ListsModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
