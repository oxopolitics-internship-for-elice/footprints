import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AddPoliticianDto } from './dto/politician.addPolitician.dto';
import { Politician, PoliticianDocument } from '../schemas/politician.schema';

@Injectable()
export class PoliticianService {
  constructor(
    @InjectModel('politicians')
    private readonly politicianModel: Model<PoliticianDocument>,
  ) {}
  async addPolitician(politicianData: AddPoliticianDto): Promise<Politician> {
    const politician = new this.politicianModel();
    politician.name = politicianData.name;
    politician.image = politicianData.image;
    politician.party = politicianData.party;
    const result = await politician.save();
    return result;
  }
}
