import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { databaseProviders } from './database.provider';
@Module({
  providers: [...databaseProviders, ConfigService],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
