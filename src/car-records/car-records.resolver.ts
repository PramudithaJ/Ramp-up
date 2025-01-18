import { Args, Mutation, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { CarRecordsService } from './car-records.service';
import { CarRecord } from './car-records.entity';
import { CreateCarRecordInput } from './dto/create-car-record.input';
import { UpdateCarRecordInput } from './dto/update-car-record.input';
import { PaginationDTO } from './dto/paginationArgs.dto';
import { DataWithPageNum } from './dto/DataWithPageNumber.input';

@Resolver()
export class CarRecordsResolver {

    constructor(private readonly carRecordsService: CarRecordsService){}

    @Query(()=> [CarRecord],{ name: 'getAllCars' })
    findAll(): Promise<CarRecord[]> {
        return this.carRecordsService.findAll()
    }

    @Query(()=>CarRecord, { name: 'getOneCar' })
    async findOne(@Args('id') id:string):Promise<CarRecord>{
        console.log(id)
        const a = await this.carRecordsService.findOne(id)
        console.log(`called service \n, ${JSON.stringify(a)}`)
        return a
    }

    @Query(()=> DataWithPageNum)
    async findAllwithpagination(@Args('pageDTO') pageDTO: PaginationDTO , @Args('search') search:string): Promise<DataWithPageNum>{
        const [ carRecord , total] = await this.carRecordsService.findAllwithPagination(pageDTO,search)
        // console.log(carRecord)
        return {carRecord, total};
    }
    

    @Mutation(()=>CarRecord)
    createCarRecord(@Args('createCarRecord') createCarRecordInput: CreateCarRecordInput): Promise<CarRecord> {
        return this.carRecordsService.createCarRecord(createCarRecordInput)
    }

    @Mutation(()=>CarRecord)
    updateCarRecord(@Args('UpdateCarRecord') updateCarRecordInput:UpdateCarRecordInput): Promise<CarRecord> {
        return this.carRecordsService.updateRecord(updateCarRecordInput.id,updateCarRecordInput)
    }

    @Mutation(() => Boolean)
    async deleteCarRecord(@Args('id') id:string): Promise<Boolean> {
        try {
            if(this.carRecordsService.delete(id)){
                console.log("deleted")
                return true;}else{
                    return false
                }
            
          } catch (error) {
            return false;
          }
    }

    @ResolveReference()// if someone comes with this data , give him what he is asking
    async resolveReference(ref: {__typename : string, vin : string}):Promise<CarRecord>{
        console.log("reference called :", ref)
        return await this.carRecordsService.findOneFromVin(ref.vin)
    }




}
