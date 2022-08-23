import { Controller, Get, HttpCode } from '@nestjs/common';
import { PoliticianService } from './politician.service';

@Controller('politician')
export class PoliticianController {
  constructor(private politicianService: PoliticianService) {}

  // 메인페이지(모든 정치인 인생 전체 그래프)
  @Get()
  @HttpCode(200)
  async getPoliticians() {
    return await this.politicianService.getAllPoliticians();
  }
}
