import Paysheet from './paysheet';

export default class Paysheets {
    content: Paysheet[];
    totalElements: number;
    totalPages: number;

    constructor() {
        this.content = [];
    }
}