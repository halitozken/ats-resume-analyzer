import { Queue } from 'bull';
export declare class AnalysisService {
    private readonly analysisQueue;
    constructor(analysisQueue: Queue);
    startAnalysis(file: Express.Multer.File, jobDescription: string): Promise<import("bull").Job<any>>;
}
