import { Controller, Get, Res } from '@nestjs/common';
import { PoliticianService } from './politician.service';

@Controller('politicians')
export class PoliticianController {
  constructor(private politicianService: PoliticianService) {}

  // 메인페이지(모든 정치인 인생 전체 그래프)
  @Get()
  async getAllPoliticians(@Res() response) {
    try {
      const result = await this.politicianService.getAllPoliticians();
      return response.json(result);
    } catch (err) {
      console.log(err);
    }
  }
}
