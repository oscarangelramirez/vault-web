export default class Cfdi {
    id: number;
    idStateSAT: number;
    uuid: string;
    serie: string;
    issue: string;
    issueRfc: string;
    issueDate: Date;
    receiver: string;
    receiverRfc: string;
    ringingDate: Date;
    invoice: string;
    wayPay: string;
    expeditionPlace: string;
    paymentMethod: string;
    currency: string;
    subTotal: number;
    total: number;
    type: string;
    use: string;
    version: string;
    isSelected: boolean;
    filePath: string;

    constructor() {
        this.isSelected = false;
    }
}