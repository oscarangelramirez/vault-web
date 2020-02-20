import { Injectable } from '@angular/core';
import { Adapter } from './adapter';
import Cfdi from '../models/cfdi';

@Injectable({
    providedIn: 'root'
})
export class CfdiAdapter implements Adapter<Cfdi> {
    adapt(item: any): Cfdi {
        let cfdi = new Cfdi();
        cfdi.id = item.id;
        cfdi.idStateSAT = item.idStateSAT;
        cfdi.uuid = item.uuid;
        cfdi.serie = item.serie;
        cfdi.issue = item.issue;
        cfdi.issueRfc = item.issueRfc;
        cfdi.issueDate = new Date(item.issueDate);
        cfdi.issueDate.setMinutes(cfdi.issueDate.getMinutes() + cfdi.issueDate.getTimezoneOffset());
        cfdi.receiver = item.receiver;
        cfdi.receiverRfc = item.receiverRfc;
        cfdi.ringingDate = new Date(item.ringingDate);
        cfdi.ringingDate.setMinutes(cfdi.ringingDate.getMinutes() + cfdi.ringingDate.getTimezoneOffset());
        cfdi.invoice = item.invoice;
        cfdi.wayPay = item.wayPay;
        cfdi.expeditionPlace = item.expeditionPlace;
        cfdi.paymentMethod = item.paymentMethod;
        cfdi.currency = item.currency;
        cfdi.subTotal = item.subTotal;
        cfdi.total = item.total;
        cfdi.type = item.type;
        cfdi.use = item.use;
        cfdi.version = item.version;
        cfdi.filePath = item.filePath;

        return cfdi;
    }
}