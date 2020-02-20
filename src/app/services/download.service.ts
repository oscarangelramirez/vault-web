import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import User from '../models/user';
import Download from '../models/download';
import { DownloadAdapter } from '../adapters/download.adapter';
import CfdiFilters from '../models/cfdi.filters';
import PaysheetFilters from '../models/paysheet.filters';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  user: User;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private downloadAdapter: DownloadAdapter) {
    this.userService.user$.subscribe(user => this.user = user);
  }

  getAllDownloads() {
    return this
      .http
      .get<Download[]>(`${environment.apiUrl}/users/${this.user.id}/downloads`)
      .pipe(map((data: any) => {
        let downloads: Download[] = [];
        data.forEach((item: any) => {
          let user = this.downloadAdapter.adapt(item);
          downloads.push(user);
        });

        return downloads;
      }));
  }

  addCfdiDownload(
    ids: number[],
    filters: CfdiFilters) {
    var request = {
      ids: ids,
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

    return this.http.post<Download>(`${environment.apiUrl}/users/${this.user.id}/downloads/cfdis`, request)
      .pipe(map((data: any) => {
        let download: Download = new Download();
        download.id = data.id;

        return download;
      }));
  }

  addPaysheetDownload(
    ids: number[],
    filters: PaysheetFilters) {
    var request = {
      ids: ids,
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

    return this.http.post<Download>(`${environment.apiUrl}/users/${this.user.id}/downloads/paysheets`, request)
      .pipe(map((data: any) => {
        let download: Download = new Download();
        download.id = data.id;

        return download;
      }));
  }

  download(download: Download) {
    return this.http.get(`${environment.apiUrl}/users/${this.user.id}/downloads/${download.id}/download`, { responseType: 'arraybuffer' });
  }
}
