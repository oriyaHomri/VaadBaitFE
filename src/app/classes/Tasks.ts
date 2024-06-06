import { Expenses } from "./Expenses";
import { Frequencies } from "./Frequencies";
import { Professionals } from "./Professionals";
import { TypeOfTasks } from "./TypeOfTasks";

export class Tasks {
    constructor(
        public IdTask: number = 0,
        public  Description:string="",
        //public TypeOfTask: TypeOfTasks=new TypeOfTasks(),
        public Date1: Date=new Date(),
        public FixedBy: Professionals = new Professionals(),
        public FixedCost: string="",
        public FixeDate: Date=new Date(),
        public IdExpense: Expenses = new Expenses(),
        public IdFrequency: Frequencies = new Frequencies()
    ) {

    }
}