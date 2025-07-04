import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { HttpModule } from '@nestjs/axios';

import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';
import { AnalysisProcessor } from './analysis.processor';


@Module({
  imports: [
    BullModule.registerQueue({
      name: 'analysis-queue',
      redis: {
        host: 'localhost',
        port: 6379
      },
    }),
    HttpModule
  ],
  controllers: [AnalysisController],
  providers: [AnalysisService, AnalysisProcessor]
})
export class AnalysisModule {}
