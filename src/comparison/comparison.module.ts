import { Module } from '@nestjs/common';
import { ComparisonService } from './comparison.service';
import { ComparisonController } from './comparison.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comparison } from './entities/comparison.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Comparison])],
  controllers: [ComparisonController],
  providers: [ComparisonService],
})
export class ComparisonModule {}
