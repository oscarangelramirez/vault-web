export default class PaysheetFilters {
    idStateSAT: number;
    issueDateFrom: Date;
    issueDateTo: Date;
    uuid: string;
    receiverRfc: string;
    receiver: string;
    employerRegister: string;
    type: string;
    paymentDateFrom: Date;
    paymentDateTo: Date;
    total: number;
    version: string;
    currency: string;
    receiverCurp: string;
    socialSecurityNumber: string;
    employeeNumber: string;
    department: string;
    numberDaysPaid: number;

    constructor(){
        this.idStateSAT = 0;
        this.issueDateFrom = null;
        this.issueDateTo = null;
        this.uuid = '';
        this.receiverRfc = '';
        this.receiver = '';
        this.employerRegister = '';
        this.type = '';
        this.paymentDateFrom = null;
        this.paymentDateTo = null;
        this.total = null;
        this.version = '';
        this.currency = '';
        this.receiverCurp = '';
        this.socialSecurityNumber = '';
        this.employeeNumber = '';
        this.department = '';
        this.numberDaysPaid = null;
    }
}