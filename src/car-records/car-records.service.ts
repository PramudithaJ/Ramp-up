import { Injectable, OnModuleInit } from '@nestjs/common';
import { CarRecord } from './car-records.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCarRecordInput } from './dto/create-car-record.input';

@Injectable()
export class CarRecordsService implements OnModuleInit {

    constructor(
        @InjectRepository(CarRecord) private readonly carRepository: Repository<CarRecord>
    ){}

    onModuleInit() {
        console.log('CarRecordsService initialized');
      }

    createCarRecord(createCarRecordInput: CreateCarRecordInput): Promise<CarRecord> {
        const newCarRecord = this.carRepository.create(createCarRecordInput)
        return this.carRepository.save(newCarRecord);
    }
      
    async findAll(): Promise<CarRecord[]>  {
            return this.carRepository.find({})

            // const carRecords: CarRecord[] = [
            //     {
                //   id: 1,
                //   firstName: 'John',
                //   lastName: 'Doe',
                //   email: 'john.doe@example.com',
                //   carMake: 'Toyota',
                //   carModel: 'Corolla',
                //   vin: '1HGCM82633A123456',
                //   manufacturedDate: new Date('2015-06-15'),
                //   ageOfVehicle: new Date().getFullYear() - 2015,
            //     },
            //     {
            //       id: 2,
            //       firstName: 'Jane',
            //       lastName: 'Smith',
            //       email: 'jane.smith@example.com',
            //       carMake: 'Honda',
            //       carModel: 'Civic',
            //       vin: '2HGFB2F50FH123457',
            //       manufacturedDate: new Date('2018-09-25'),
            //       ageOfVehicle: new Date().getFullYear() - 2018,
            //     },
            //   ];

            //   return carRecords
      }
}
