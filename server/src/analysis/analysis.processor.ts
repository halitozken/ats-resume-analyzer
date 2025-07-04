import { HttpService } from '@nestjs/axios';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { firstValueFrom } from 'rxjs';

@Processor('analysis-queue')
export class AnalysisProcessor {
  private readonly pythonApiUrl = 'http://localhost:8001/analyze';

  constructor(private readonly httpService: HttpService) {}

  @Process('analyze-job')
  async handleAnalysis(job: Job) {
    console.log(`Processing job ${job.id}...`);

    const { file, jobDescription } = job.data;

    try {
      const formData = new FormData();

      const fileBuffer = Buffer.from(file.buffer, 'base64');

      const fileBlob = new Blob([fileBuffer], { type: file.mimetype });

      formData.append('resume', fileBlob, file.originalname);
      formData.append('job_description', jobDescription);

      const response = await firstValueFrom(
        this.httpService.post(this.pythonApiUrl, formData),
      );

      console.log(
        `Analyse successfully. Analyse ID: ${job.id} Skor:`,
        response.data.similarity_score,
      );
    } catch (error) {
      console.log(
        `Analyse failed. Analyse ID: ${job.id}`,
        error.response?.data || error.message,
      );
    }
  }
}
