import { Controller, Get, Res } from '@nestjs/common';
import { PoliticianService } from './politician.service';

@Controller('politicians')
export class PoliticianController {
  constructor(private politicianService: PoliticianService) {}

  // 메인페이지(모든 정치인 인생 전체 그래프)
  @Get()
  async getPoliticians(@Res() response) {
    try {
      const result = await this.politicianService.getAllPoliticians();
      return response.json(result);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
