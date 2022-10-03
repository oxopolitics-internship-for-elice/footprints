import { Body, Controller, Get, HttpException, HttpStatus, Post, Res, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/utils/http-exception.filter';
import { PoliticianDto } from './dto/politician.dto';
import { PoliticianService } from './politician.service';

@Controller('politicians')
@UseFilters(HttpExceptionFilter)
export class PoliticianController {
  constructor(private readonly politicianService: PoliticianService) {}

  // 메인페이지(모든 정치인 인생 전체 그래프)
  @Get()
  async getAllPoliticians(@Res() res): Promise<Array<any>> {
    try {
      const politicians = await this.politicianService.getAllPoliticians();
    
      return res.json(politicians);

    } catch (err) {
      throw new HttpException(`undefined error: ${err.message}`, 500);
    }
  }

  // 정치인 추가
  @Post()
  async addPolitician(@Body() body: PoliticianDto, @Res() res): Promise<Record<string, unknown>> {
    try {
      const politician = await this.politicianService.addPolitician(body);
      
      if (!politician) {
        throw new HttpException('create failed', 400)
      }
      return res.status(HttpStatus.CREATED).json(politician);

    } catch (err) {
      throw new HttpException(`undefined error: ${err.message}`, 500);
    }
  }
}
