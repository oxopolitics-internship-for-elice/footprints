import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { IssuesController } from './issues/issues.controller';
import { IssuesService } from './issues/issues.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectionFactory: (connection) => {
        if (connection.readyState === 1) {
          Logger.log('DB connected');
        }
        connection.on('disconnected', () => {
          Logger.log('DB disconnected');
        });
        return connection;
      },
    }),
  ],
  controllers: [AppController, IssuesController],
  providers: [AppService, IssuesService],
})
export class AppModule {}
