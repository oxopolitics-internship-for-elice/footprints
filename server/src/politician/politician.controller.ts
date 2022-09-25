import { Body, Controller, Get, HttpCode, Post, Res } from '@nestjs/common';
import { PoliticianDto } from './dto/politician.dto';
import { PoliticianService } from './politician.service';

@Controller('politicians')
export class PoliticianController {
  constructor(private politicianService: PoliticianService) {}

  // 메인페이지(모든 정치인 인생 전체 그래프)
  @Get()
  @HttpCode(200)
  async getAllPoliticians(): Promise<Array<any>> {
    try {
      const result = await this.politicianService.getAllPoliticians();
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  // 정치인 추가
  @Post()
  @HttpCode(201)
  async addPolitician(@Body() body: PoliticianDto): Promise<Record<string, unknown>> {
    try {
      const result = await this.politicianService.addPolitician(body);
      if (result) {
        return { message: 'success' };
      }
    } catch (err) {
      console.log(err);
    }
  }
}
