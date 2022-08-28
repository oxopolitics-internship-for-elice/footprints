import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { IssueModule } from './issue/issue.module';
import { UserModule } from './user/user.module';
import { PoliticianModule } from './politician/politician.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,

      connectionFactory: (connection) => {
        if (connection.readyState === 1) {
          Logger.log('#### DB connected #####');
        }
        connection.on('disconnected', () => {
          Logger.log('#### DB disconnected ####');
        });
        return connection;
      },
    }),

    UserModule,
    AuthModule,
    UserModule,
    IssueModule,
    PoliticianModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
