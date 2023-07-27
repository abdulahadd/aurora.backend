import { PartialType } from "@nestjs/swagger";
import { OrgModel } from "../models/org.model";




export class UpdateOrgDto extends PartialType(OrgModel){}