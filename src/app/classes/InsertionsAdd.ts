import { Data } from "@angular/router";
import { Tenants } from "./Tenants";

export class InsertionsAdd {
    constructor(
        public IdInsertion: number = 0,
        public Description: string = "",
        public Amount: string = "",
        public Date1: Data = new Date(),
        public TenantId: number=0
    ) {

    }
}