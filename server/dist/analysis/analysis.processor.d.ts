import { HttpService } from '@nestjs/axios';
import { Job } from 'bull';
export declare class AnalysisProcessor {
    private readonly httpService;
    private readonly pythonApiUrl;
    constructor(httpService: HttpService);
    handleAnalysis(job: Job): Promise<void>;
}
