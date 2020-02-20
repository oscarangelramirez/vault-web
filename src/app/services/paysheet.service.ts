import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { PaysheetAdapter } from '../adapters/paysheet.adapter';
import PaysheetFilters from '../models/paysheet.filters';
import Page from '../models/page';
import Paysheets from '../models/paysheets';

@Injectable({
  providedIn: 'root'
})
export class PaysheetService {

  constructor(private http: HttpClient,
    private adapter: PaysheetAdapter) { }

  getAllPaysheets(
    page: Page,
    filters: PaysheetFilters) {
    var request = {
      idStateSAT: filters.idStateSAT,
      issueDateFrom: filters.issueDateFrom,
      issueDateTo: filters.issueDateTo,
      uuid: filters.uuid,
      receiverRfc: filters.receiverRfc,
      receiver: filters.receiver,
      employerRegister: filters.employerRegister,
      type: filters.type,
      paymentDateFrom: filters.paymentDateFrom,
      paymentDateTo: filters.paymentDateTo,
      total: filters.total,
      version: filters.version,
      currency: filters.currency,
      receiverCurp: filters.receiverCurp,
      socialSecurityNumber: filters.socialSecurityNumber,
      employeeNumber: filters.employeeNumber,
      department: filters.department,
      numberDaysPaid: filters.numberDaysPaid
    };

    let params = new HttpParams()
      .set('page', page.page.toString())
      .set('size', page.size.toString());

    return this
      .http
      .post<Paysheets>(`${environment.apiUrl}/issues/paysheets/paged`, request, { params: params })
      .pipe(map((data: any) => {
        let paysheets: Paysheets = new Paysheets();
        data.content.forEach((item: any) => {
          let paysheet = this.adapter.adapt(item);
          paysheets.content.push(paysheet);
        });

        paysheets.totalElements = data.totalElements;
        paysheets.totalPages = data.totalPages;

        return paysheets;
      }));
  }

  getAllEmployees() {
    return this
      .http
      .get<string[]>(`./assets/json/employees.json`)
      .pipe(map((data: any) => {
        let result: string[] = [];
        data.forEach((item: any) => {
          result.push(item);
        });

        return result;
      }));
  }
}
