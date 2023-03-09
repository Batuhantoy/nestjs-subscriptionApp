import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceModule } from './subscriptionService/service.module';

@Module({
  imports: [ServiceModule,MongooseModule.forRoot('mongodb+srv://batuhantoy:öylesinesifre@cluster0.3zlce3f.mongodb.net/?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
