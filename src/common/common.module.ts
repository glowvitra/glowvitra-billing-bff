import { Module } from '@nestjs/common';
import { CustomLoggerModule } from './logger/custom-logger.module';

const commonModules = [CustomLoggerModule];

@Module({
  imports: commonModules,
  exports: commonModules,
})
export class CommonModule {}
