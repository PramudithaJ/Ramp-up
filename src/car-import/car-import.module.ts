import { Module } from '@nestjs/common';
import { CarImportService } from './car-import.service';
import { CarImportController } from './car-import.controller';
import { BullModule } from '@nestjs/bull';
import { ImportProcessor } from './import.processor';
import { CarRecordsModule } from 'src/car-records/car-records.module';

@Module({
  providers: [CarImportService, ImportProcessor],
  controllers: [CarImportController],
  imports:[
BullModule.registerQueue({
  name:'import-queue'
}),
CarRecordsModule]
})
export class CarImportModule {}
