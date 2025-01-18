import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreateCarRecordInput } from "./create-car-record.input";

@InputType()
export class UpdateCarRecordInput extends PartialType(CreateCarRecordInput){

@Field()
id : string

@Field({ nullable:true})
firstName : string

@Field({ nullable:true})
lastName : string

@Field({ nullable:true})
email : string

@Field({ nullable:true})
carMake : string

@Field({ nullable:true})
carModel : string

@Field({ nullable:true})
vin : string

@Field({ nullable:true})
manufacturedDate : Date

@Field({ nullable:true})
ageOfVehicle : number

}