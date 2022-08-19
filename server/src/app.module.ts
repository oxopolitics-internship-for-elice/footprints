import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { issueSchema } from './schemas/issue.schema';
import { IssueController } from './issue/issue.controller';
import { IssueModule } from './issue/issue.module';

import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,

      UserModule,

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
    IssueModule,
  ],
  controllers: [AppController, IssueController],
  providers: [AppService],
})
export class AppModule {}
