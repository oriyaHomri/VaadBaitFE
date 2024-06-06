// import { FrequencyObject } from "./FrequencyObject";
// import { FrequencyOperator } from "./FrequencyOperator";
// import { FrequencyType } from "./FrequencyType";
import { TypeOfTasks } from "./TypeOfTasks";

export class Frequencies {
    constructor(
        public FrequenciesCode: number = 0,
        public FrequencyType1:TypeOfTasks= new TypeOfTasks(),
        public Fixed1: boolean =false,
        public Details: string="",
        public StartDate: Date = new Date()
    ) {

    }
}