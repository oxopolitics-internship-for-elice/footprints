/* eslint-disable prettier/prettier */
import {  Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI,{
      useNewUrlParser : true,
      useUnifiedTopology : true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
