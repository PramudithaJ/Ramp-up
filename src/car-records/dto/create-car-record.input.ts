import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { CarRecord } from "../car-records.entity";

@InputType()
export class CreateCarRecordInput {

@Field()
firstName : string

@Field()
lastName : string

@Field()
email : string

@Field()
carMake : string

@Field()
carModel : string

@Field()
vin : string

@Field()
manufacturedDate : Date

@Field()
ageOfVehicle : number

}