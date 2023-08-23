import { PartialType } from "@nestjs/swagger";
import { Event } from "../models/eventSchema";


export class UpdateEventDto extends PartialType(Event){}