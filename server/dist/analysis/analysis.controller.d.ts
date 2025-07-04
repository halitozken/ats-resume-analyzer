import { JobDescriptionDto } from './dto/analysis.dto';
import { AnalysisService } from './analysis.service';
export declare class AnalysisController {
    private readonly analysisService;
    constructor(analysisService: AnalysisService);
    uploadFile(file: Express.Multer.File, body: JobDescriptionDto): Promise<{
        message: string;
        jobId: import("bull").JobId;
    }>;
}
