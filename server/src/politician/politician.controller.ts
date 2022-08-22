import { Controller, HttpStatus, Res, Body, Post } from '@nestjs/common';
import { PoliticianService } from './politician.service';
import { AddPoliticianDto } from './dto/politician.addPolitician.dto';

@Controller('politicians')
export class PoliticianController {
  constructor(private politicianService: PoliticianService) {}
  @Post()
  async addPolitician(
    @Body() politicianData: AddPoliticianDto,
    @Res() response,
  ) {
    try {
      const politician = await this.politicianService.addPolitician(
        politicianData,
      );
      return response.status(HttpStatus.OK).json({
        message: 'create successfully',
        politician,
      });
    } catch (err) {}
  }
}
