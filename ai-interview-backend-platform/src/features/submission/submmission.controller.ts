import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { CreateSubmissionDto, SubmissionResponseDto } from 'src/interfaces/submission.dto';
import { Observable } from 'rxjs';



@Controller('submission')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post()
  createSubmission(@Body() dto: CreateSubmissionDto): Observable<SubmissionResponseDto> {
    return this.submissionService.createSubmission({dto});
  }

  @Get(':id')
  getSubmissionById(@Param('id') id: string): Observable<SubmissionResponseDto> {
    return this.submissionService.getSubmissionById(id);
  }

  @Get('/user/:userId')
  getSubmissionsByUser(@Param('userId') userId: string): Observable<SubmissionResponseDto[]> {
    return this.submissionService.getSubmissionsByUser(userId);
  }
}
