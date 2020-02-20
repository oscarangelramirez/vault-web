import { Injectable } from '@angular/core';
import { Adapter } from './adapter';
import Download from '../models/download';

@Injectable({
    providedIn: 'root'
})
export class DownloadAdapter implements Adapter<Download> {
    adapt(item: any): Download {
        let download = new Download();
        download.id = item.id;
        download.name = item.name;
        download.pathFile = item.pathFile;
        download.beginDate = new Date(item.beginDate);
        download.beginDate.setMinutes(download.beginDate.getMinutes() + download.beginDate.getTimezoneOffset());
        download.endDate = new Date(item.endDate);
        download.endDate.setMinutes(download.endDate.getMinutes() + download.endDate.getTimezoneOffset());
        download.status = item.status;

        return download;
    }
}