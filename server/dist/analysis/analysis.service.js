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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisService = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
let AnalysisService = class AnalysisService {
    analysisQueue;
    constructor(analysisQueue) {
        this.analysisQueue = analysisQueue;
    }
    async startAnalysis(file, jobDescription) {
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
};
exports.AnalysisService = AnalysisService;
exports.AnalysisService = AnalysisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)('analysis-queue')),
    __metadata("design:paramtypes", [Object])
], AnalysisService);
//# sourceMappingURL=analysis.service.js.map