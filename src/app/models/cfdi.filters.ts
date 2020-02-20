export default class CfdiFilters {
    idStateSAT: number;
    uuid: string;
    issue: string;
    issueRfc: string;
    issueDateFrom: Date;
    issueDateTo: Date;
    receiver: string;
    receiverRfc: string;
    ringingDateFrom: Date;
    ringingDateTo: Date;
    expeditionPlace: string;
    currency: string;
    total: number;
    use: string;
    version: string;

    constructor(){
        this.idStateSAT = 0;
        this.uuid = '';
        this.issue = '';
        this.issueRfc = '';
        this.issueDateFrom = null;
        this.issueDateTo = null;
        this.receiver = '';
        this.receiverRfc = '';
        this.ringingDateFrom = null;
        this.ringingDateTo = null;
        this.expeditionPlace = '';
        this.currency = '';
        this.total = null;
        this.use = '';
        this.version = '';
    }
}