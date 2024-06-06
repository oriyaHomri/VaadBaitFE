export class ExpensesAdd {
    constructor(
        public IdExpense: number = 0,
        public Amount: string = "" ,
        public Date1: Date = new Date(),
        public Details:number=0,
        public Receipt: string = ""
    ) {

    }
}