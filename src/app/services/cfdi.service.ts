import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CfdiAdapter } from '../adapters/cfdi.adapter';
import Cfdi from '../models/cfdi';
import Cfdis from '../models/cfdis';
import CfdiFilters from '../models/cfdi.filters';
import Page from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class CfdiService {

  constructor(
    private http: HttpClient,
    private adapter: CfdiAdapter) { }

  getAllCfdis(
    page: Page,
    filters: CfdiFilters) {
    var request = {
      idStateSAT: filters.idStateSAT,
      version: filters.version,
      issueDateFrom: filters.issueDateFrom,
      issueDateTo: filters.issueDateTo,
      ringingDateFrom: filters.ringingDateFrom,
      ringingDateTo: filters.ringingDateTo,
      uuid: filters.uuid,
      issueRfc: filters.issueRfc,
      issue: filters.issue,
      expeditionPlace: filters.expeditionPlace,
      receiverRfc: filters.receiverRfc,
      receiver: filters.receiver,
      use: filters.use,
      total: filters.total,
      currency: filters.currency
    };

    let params = new HttpParams()
      .set('page', page.page.toString())
      .set('size', page.size.toString());

    return this
      .http
      .post<Cfdis>(`${environment.apiUrl}/issues/cfdis/paged`, request, { params: params })
      .pipe(map((data: any) => {
        let cfdis: Cfdis = new Cfdis();
        data.content.forEach((item: any) => {
          let cfdi = this.adapter.adapt(item);
          cfdis.content.push(cfdi);
        });

        cfdis.totalElements = data.totalElements;
        cfdis.totalPages = data.totalPages;

        return cfdis;
      }));
  }
}
