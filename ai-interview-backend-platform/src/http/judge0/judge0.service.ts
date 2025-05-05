import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { Judge0SubmissionError } from './judge0.error';
import { AxiosResponse } from 'axios';

@Injectable()
export class Judge0Service {
  private readonly baseUrl = 'https://judge0-ce.p.rapidapi.com';

  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async submitCode(source_code: string, language_id: number, stdin: string = ''): Promise<any> {
    const apiKey = this.configService.get<string>('JUDGE0_API_KEY');

    const options = {
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      },
    };

    const body = {
      source_code,
      language_id,
      stdin,
    };

    try {
        const response: AxiosResponse = await lastValueFrom(
        this.http.post(`${this.baseUrl}/submissions?base64_encoded=false&wait=true`, body, options),
      );
      return response.data;
    } catch (err) {
      throw new Judge0SubmissionError(err.message);
    }
  }
}
