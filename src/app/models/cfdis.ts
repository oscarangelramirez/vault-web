import Cfdi from './cfdi';

export default class Cfdis {
    content: Cfdi[];
    totalElements: number;
    totalPages: number;

    constructor() {
        this.content = [];
    }
}