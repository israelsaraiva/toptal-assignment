import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { History } from './history.entity';
import { HistoryService } from './history.service';

@Module({
  imports: [TypeOrmModule.forFeature([History])],
  providers: [HistoryService],
  exports: [HistoryService]
})
export class HistoryModule {}
