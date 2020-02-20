import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DownloadService } from 'src/app/services/download.service';
import { UserService } from 'src/app/services/user.service';
import Download from 'src/app/models/download';
import User from 'src/app/models/user';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-downloads-get-all',
  templateUrl: './downloads-get-all.component.html',
  styleUrls: ['./downloads-get-all.component.scss']
})
export class DownloadsGetAllComponent implements OnInit {
  selectedStatus: number = -1;
  downloads: Download[] = [];
  page: number = 1;
  pageSize: number = 10;
  total: number;
  toogle: boolean;
  user: User;

  constructor(
    private router: Router,
    private donwloadService: DownloadService,
    private userService: UserService) { }

  ngOnInit() {
    this.userService.user$.subscribe(user => this.user = user);

    this.donwloadService
      .getAllDownloads()
      .subscribe(data => {
        this.downloads = data;
      }, error => {
        console.log(error);
      });
  }

  getDownload(download: Download) {
    this.donwloadService
      .download(download)
      .subscribe(data => {
        var contentType = "application/octet-stream";
        var blob = new Blob([data], { type: contentType });
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob, download.name);
        }
        else{
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.style.display = "none";
          a.href = url;
          a.download = download.name;
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        }
      }, error => {
        console.log(error);
      });
  }

  getDownloads() {
    let downloads = this.downloads;

    if (this.selectedStatus != -1) {
      downloads = downloads.filter(download => download.status == this.selectedStatus);
    }

    this.total = downloads.length;

    downloads = downloads.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

    return downloads;
  }

  logout() {
    this.userService.logoutUser();
    this.router.navigate(['/home']);
  }

  get isAdmin(){
    return this.user && (this.user.role === Role.Admin);
  }

  get isCfdi(){
    return this.user && (this.user.role === Role.Cfdi || this.user.role === Role.Admin);
  }

  get isPaysheet(){
    return this.user && (this.user.role === Role.Paysheet || this.user.role === Role.Admin);
  }
}
