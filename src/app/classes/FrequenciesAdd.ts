

export class FrequenciesAdd {
    constructor(
        public FrequenciesCode: number = 0,
        public FrequencyType1:number= 0,
        public Fixed1: boolean =false,
        public Details: string="",
        public StartDate: Date = new Date()
    ) {

    }
}