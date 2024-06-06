import { TypeOfProfessionals } from "./TypeOfProfessionals";

export class Professionals {
    constructor(
        public ProfessionalsCode: number = 0,
        public FirstName: string = '',
        public LastName: string = '',
        public Address: string = '',
        public Phone: number = 0,
        public Mobile:string='true',
        public TypeOfProfessional:TypeOfProfessionals  =new TypeOfProfessionals() ,
        public EMail: string = ''
    ) { }
}
