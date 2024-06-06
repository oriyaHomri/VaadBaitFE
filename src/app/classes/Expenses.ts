import { FrequencyObject } from "./FrequencyObject";

export class Expenses {
    constructor(
        public IdExpense: number = 0,
        public Amount: string = "" ,
        public Date1: Date = new Date(),
        public Details:string="",
        public Receipt: string = ""
    ) {

    }
}