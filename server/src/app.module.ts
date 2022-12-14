import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { IssueModule } from './issue/issue.module';
import { PoliticianModule } from './politician/politician.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectionFactory: (connection) => {
        console.log(process.env.MONGODB_URI)
        if (connection.readyState === 1) {
          Logger.log('DB connected');
          console.log('################ MongoDB connected #################');
        }
        connection.on('disconnected', () => {
          Logger.log('DB disconnected');
        });
        return connection;
      },
    }),
    UserModule,
    AuthModule,
    IssueModule,
    PoliticianModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
