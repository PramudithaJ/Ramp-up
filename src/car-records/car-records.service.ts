import { Injectable, OnModuleInit } from '@nestjs/common';
import { CarRecord } from './car-records.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCarRecordInput } from './dto/create-car-record.input';
import { UpdateCarRecordInput } from './dto/update-car-record.input';
import { PaginationDTO } from './dto/paginationArgs.dto';


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

    async updateRecord(id:string,updateCarRecordInput:UpdateCarRecordInput){
         const data = await this.carRepository.update(id,updateCarRecordInput)
         console.log("update data",JSON.stringify(data))
         return this.carRepository.findOne( { where: {id} })
    }

    
     
     
      
    async findAll(): Promise<CarRecord[]>  {
            return this.carRepository.find({})

            // const carRecords: CarRecord[] = [
            //     {
            //       id: "1ccfe2ea-b338-41fe-920c-f7b451033535",
            //       firstName: 'John',
            //       lastName: 'Doe',
            //       email: 'john.doe@example.com',
            //       carMake: 'Toyota',
            //       carModel: 'Corolla',
            //       vin: '1HGCM82633A123456',
            //       manufacturedDate: new Date('2015-06-15'),
            //       ageOfVehicle: new Date().getFullYear() - 2015,
            //     },
            //     {
            //       id: "207502c8-07c5-48fe-9c23-4850aa0a5607",
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

    async findAllwithPagination(pageDTO : PaginationDTO, search):Promise<[CarRecord[],number]>{
        const {skip, take} = pageDTO
        const where: FindOptionsWhere<CarRecord> = search ? { carModel: ILike(`%${search}%`) } : {};
        const data = await this.carRepository.findAndCount({
            where,
            order:{manufacturedDate:"ASC"},
            take,
            skip,
        });
        //console.log("In service layer", data)
        return data;
    }  

    async delete(id:string):Promise<number | null>{
        const result = await this.carRepository.delete(id)
        return result.affected
    }

    async findOne(id: string):Promise<CarRecord> {
        console.log(`ID => ${id}`)
        const res =  await this.carRepository.findOne({ where: {id} })
        console.log('response from repo :', res)
        return res;
    }

    async findOneFromVin(vin: string): Promise<CarRecord> {
        console.log(`ID => ${vin}`)
        const res =  await this.carRepository.findOne({ where: {vin} })
        console.log('response from repo :', res)
        return res;
    }

  
}
