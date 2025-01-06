import { Module } from '@nestjs/common';
import { CarRecordsService } from './car-records.service';
import { CarRecordsResolver } from './car-records.resolver';
import { CarRecord } from './car-records.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([CarRecord])
  ],
  providers: [CarRecordsService, CarRecordsResolver],
  exports:[CarRecordsService]
})
export class CarRecordsModule {}
