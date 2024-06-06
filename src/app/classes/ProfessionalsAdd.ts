import { TypeOfProfessionals } from "./TypeOfProfessionals";

export class ProfessionalsAdd {
    constructor(
        public ProfessionalsCode: number = 0,
        public FirstName: string = '',
        public LastName: string = '',
        public Address: string = '',
        public Phone: number = 0,
        public Mobile:string='true',
        public TypeOfProfessional:number=0 ,
        public EMail: string = ''
    ) { }
}
