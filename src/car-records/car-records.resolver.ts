import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CarRecordsService } from './car-records.service';
import { CarRecord } from './car-records.entity';
import { CreateCarRecordInput } from './dto/create-car-record.input';

@Resolver()
export class CarRecordsResolver {

    constructor(private readonly carRecordsService: CarRecordsService){}

    @Query(()=> [CarRecord])
    findAll(): Promise<CarRecord[]> {
        return this.carRecordsService.findAll()
    }

    @Mutation(()=>CarRecord)
    createCarRecord(@Args('createCarRecord') createCarRecordInput: CreateCarRecordInput): Promise<CarRecord> {
        return this.carRecordsService.createCarRecord(createCarRecordInput)
    }

    updateCarRecord(): Promise<CarRecord> {
        return
    }


}
