import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreateCarRecordInput } from "./create-car-record.input";

@InputType()
export class UpdateCarRecordInput extends PartialType(CreateCarRecordInput){

@Field( type => Int)
id : number

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