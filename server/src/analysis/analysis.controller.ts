import {
  Body,
  Controller,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JobDescriptionDto } from './dto/analysis.dto';
import { AnalysisService } from './analysis.service';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('resume'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 5 * 1024 * 1024,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body: JobDescriptionDto,
  ) {
    const job = await this.analysisService.startAnalysis(file, body.jobDescription)

    return {
        message: 'Analysis has been started.',
        jobId: job.id,
    }
  }
}
