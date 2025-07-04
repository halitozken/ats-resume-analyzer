"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisProcessor = void 0;
const axios_1 = require("@nestjs/axios");
const bull_1 = require("@nestjs/bull");
const rxjs_1 = require("rxjs");
let AnalysisProcessor = class AnalysisProcessor {
    httpService;
    pythonApiUrl = 'http://localhost:8001/analyze';
    constructor(httpService) {
        this.httpService = httpService;
    }
    async handleAnalysis(job) {
        console.log(`Processing job ${job.id}...`);
        const { file, jobDescription } = job.data;
        try {
            const formData = new FormData();
            const fileBuffer = Buffer.from(file.buffer, 'base64');
            const fileBlob = new Blob([fileBuffer], { type: file.mimetype });
            formData.append('resume', fileBlob, file.originalname);
            formData.append('job_description', jobDescription);
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(this.pythonApiUrl, formData));
            console.log(`Analyse successfully. Analyse ID: ${job.id} Skor:`, response.data.similarity_score);
        }
        catch (error) {
            console.log(`Analyse failed. Analyse ID: ${job.id}`, error.response?.data || error.message);
        }
    }
};
exports.AnalysisProcessor = AnalysisProcessor;
__decorate([
    (0, bull_1.Process)('analyze-job'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AnalysisProcessor.prototype, "handleAnalysis", null);
exports.AnalysisProcessor = AnalysisProcessor = __decorate([
    (0, bull_1.Processor)('analysis-queue'),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AnalysisProcessor);
//# sourceMappingURL=analysis.processor.js.map