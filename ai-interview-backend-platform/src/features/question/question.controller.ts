import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto, QuestionResponseDto } from 'src/interfaces/question.dto';
import { Observable } from 'rxjs';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/interfaces/user.dto';


@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() dto: CreateQuestionDto): Observable<QuestionResponseDto> {
    return this.questionService.createQuestion(dto);
  }

  @Get()
  getAll(): Observable<QuestionResponseDto[]> {
    return this.questionService.getAllQuestions();
  }

  @Get(':id')
  getById(@Param('id') id: string): Observable<QuestionResponseDto> {
    return this.questionService.getQuestionById(id);
  }
}
