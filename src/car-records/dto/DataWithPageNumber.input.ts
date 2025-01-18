import { Field, Int, ObjectType } from "@nestjs/graphql";
import { CarRecord } from "../car-records.entity";

@ObjectType()
export class DataWithPageNum {

    @Field(()=>[CarRecord])    
    carRecord: CarRecord[]

    @Field(()=>Int) 
    total:Number




}