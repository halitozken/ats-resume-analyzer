import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class AnalysisService {
  constructor(
    @InjectQueue('analysis-queue') private readonly analysisQueue: Queue,
  ) {}

  async startAnalysis(file: Express.Multer.File, jobDescription: string) {
    const job = await this.analysisQueue.add('analyze-job', {
      file: {
        buffer: file.buffer.toString('base64'),
        originalname: file.originalname,
        mimetype: file.mimetype,
      },
      jobDescription: jobDescription,
    });

    return job;
  }
}
