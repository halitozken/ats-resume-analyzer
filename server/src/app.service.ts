import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  welcomePage(): string {
    return 'AI-Powered ATS Resume Analyzer';
  }
}
