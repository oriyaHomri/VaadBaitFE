import { Data } from "@angular/router";
import { Tenants } from "./Tenants";

export class Insertions {
    constructor(
        public IdInsertion: number = 0,
        public Description: string = "",
        public Amount: string = "",
        public Date1: Data = new Date(),
        public TenantId: Tenants=new Tenants()
    ) {

    }
}