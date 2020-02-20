import { Injectable } from '@angular/core';
import { Adapter } from './adapter';
import Cfdi from '../models/cfdi';
import Paysheet from '../models/paysheet';

@Injectable({
    providedIn: 'root'
})
export class PaysheetAdapter implements Adapter<Paysheet> {
    adapt(item: any): Paysheet {
        let paysheet = new Paysheet();
        paysheet.id = item.id;
        paysheet.idStateSAT = item.idStateSAT;
        paysheet.issueDate = new Date(item.issueDate);
        paysheet.invoice = item.invoice;
        paysheet.serie = item.serie;
        paysheet.uuid = item.uuid;
        paysheet.receiverRfc = item.receiverRfc;
        paysheet.receiverCurp = item.receiverCurp;
        paysheet.receiver = item.receiver;
        paysheet.employerRegister = item.employerRegister;
        paysheet.type = item.type;
        paysheet.paymentDate = new Date(item.paymentDate);
        paysheet.paymentDate.setMinutes(paysheet.paymentDate.getMinutes() + paysheet.paymentDate.getTimezoneOffset());
        paysheet.beginPaymentDate = new Date(item.beginPaymentDate);
        paysheet.beginPaymentDate.setMinutes(paysheet.beginPaymentDate.getMinutes() + paysheet.beginPaymentDate.getTimezoneOffset());
        paysheet.endPaymentDate = new Date(item.endPaymentDate);
        paysheet.endPaymentDate.setMinutes(paysheet.endPaymentDate.getMinutes() + paysheet.endPaymentDate.getTimezoneOffset());
        paysheet.numberDaysPaid = item.numberDaysPaid;
        paysheet.total = item.total;
        paysheet.wayPay = item.wayPay;
        paysheet.taxRegime = item.taxRegime;
        paysheet.version = item.version;
        paysheet.currency = item.currency;
        paysheet.socialSecurityNumber = item.socialSecurityNumber;
        paysheet.regimeType = item.regimeType;
        paysheet.employeeNumber = item.employeeNumber;
        paysheet.periodicityPayment = item.periodicityPayment;
        paysheet.department = item.department;
        paysheet.filePath = item.filePath;

        return paysheet;
    }
}