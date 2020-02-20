export default class Paysheet {
    id: number;
    idStateSAT: number;
    issueDate: Date;
    invoice: string;
    serie: string;
    uuid: string;
    receiverRfc: string;
    receiverCurp: string;
    receiver: string;
    employerRegister: string;
    type: string;
    paymentDate: Date;
    beginPaymentDate: Date;
    endPaymentDate: Date;
    numberDaysPaid: number;
    total: number;
    wayPay: string;
    taxRegime: string;
    version: string;
    currency: string;
    socialSecurityNumber: string;
    regimeType: string;
    employeeNumber: string;
    periodicityPayment: string;
    department: string;
    isSelected: boolean;
    filePath: string;

    constructor() {
        this.isSelected = false;
    }
}