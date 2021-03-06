import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import DatabaseOrmModule from 'config/database.config';
import FirebaseConfig from 'config/firebase.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ComponentsModule } from './components/components.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseOrmModule(),
    FirebaseConfig,
    ComponentsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
