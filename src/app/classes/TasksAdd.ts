import { Expenses } from "./Expenses";
import { Frequencies } from "./Frequencies";
import { Professionals } from "./Professionals";
import { TypeOfTasks } from "./TypeOfTasks";

export class TasksAdd {
    constructor(
        public IdTask: number = 0,
        public TypeOfTask: number=0,
        public Date1: Date=new Date(),
        public Description: string="",
        public FixedBy: number = 0,
        public FixedCost: string="",
        public FixeDate: Date=new Date(),
        public IdExpense: number=0,
        // public IdFrequency: Frequencies = new Frequencies()
    ) {

    }
}