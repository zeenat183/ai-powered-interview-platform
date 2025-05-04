import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class Judge0Service {
    private readonly http;
    private readonly configService;
    private readonly baseUrl;
    constructor(http: HttpService, configService: ConfigService);
    submitCode(source_code: string, language_id: number, stdin?: string): Promise<any>;
}
