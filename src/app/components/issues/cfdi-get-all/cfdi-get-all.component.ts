import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalMessageComponent } from '../../modals/modal-message/modal-message.component';
import { CfdiService } from 'src/app/services/cfdi.service';
import { UserService } from 'src/app/services/user.service';
import { DownloadService } from 'src/app/services/download.service';
import Cfdi from 'src/app/models/cfdi';
import User from 'src/app/models/user';
import CfdiFilters from 'src/app/models/cfdi.filters';
import Cfdis from 'src/app/models/cfdis';
import Page from 'src/app/models/page';
import { Role } from 'src/app/models/role';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cfdi-get-all',
  templateUrl: './cfdi-get-all.component.html',
  styleUrls: ['./cfdi-get-all.component.scss']
})
export class CfdiGetAllComponent implements OnInit {
  page: Page = new Page();
  cfdis: Cfdis = new Cfdis();
  searchForm: FormGroup;
  submitted = false;

  toogle: boolean;
  isCheckedHeader: boolean;
  user: User;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private cfdiService: CfdiService,
    private donwloadService: DownloadService,
    private userService: UserService) { }

  ngOnInit() {
    this.userService.user$.subscribe(user => this.user = user);

    this.searchForm = this.formBuilder.group({
      idStateSAT: [0],
      version: [''],
      issueDateFrom: [null],
      issueDateTo: [null],
      ringingDateFrom: [null],
      ringingDateTo: [null],
      uuid: ['', [Validators.pattern('[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}')]],
      issueRfc: ['', [Validators.pattern('[A-Z&Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]')]],
      issue: [''],
      expeditionPlace: [''],
      receiverRfc: ['', [Validators.pattern('[A-Z&Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]')]],
      receiver: [''],
      use: [''],
      total: [null, [Validators.pattern('[0-9]{1,18}(.[0-9]{1,6})?')]],
      currency: ['']
    });
  }

  get f() { return this.searchForm.controls; }

  search() {
    this.submitted = true;

    if (this.searchForm.invalid) {
      return;
    }

    this.page.page = 0;

    let filters = new CfdiFilters();

    filters.idStateSAT = this.f.idStateSAT.value != 0 ? this.f.idStateSAT.value : null;
    filters.version = this.f.version.value;
    filters.issueDateFrom = this.f.issueDateFrom.value ? new Date(this.f.issueDateFrom.value.year, this.f.issueDateFrom.value.month - 1, this.f.issueDateFrom.value.day) : null;
    filters.issueDateTo = this.f.issueDateTo.value ? new Date(this.f.issueDateTo.value.year, this.f.issueDateTo.value.month - 1, this.f.issueDateTo.value.day) : null;
    filters.ringingDateFrom = this.f.ringingDateFrom.value ? new Date(this.f.ringingDateFrom.value.year, this.f.ringingDateFrom.value.month - 1, this.f.ringingDateFrom.value.day) : null;
    filters.ringingDateTo = this.f.ringingDateTo.value ? new Date(this.f.ringingDateTo.value.year, this.f.ringingDateTo.value.month - 1, this.f.ringingDateTo.value.day) : null;
    filters.uuid = this.f.uuid.value;
    filters.issueRfc = this.f.issueRfc.value;
    filters.issue = this.f.issue.value;
    filters.expeditionPlace = this.f.expeditionPlace.value;
    filters.receiverRfc = this.f.receiverRfc.value;
    filters.receiver = this.f.receiver.value;
    filters.use = this.f.use.value;
    filters.total = this.f.total.value;
    filters.currency = this.f.currency.value;

    this.cfdiService
      .getAllCfdis(
        this.page,
        filters
      )
      .subscribe(data => {
        this.cfdis = data;
        this.submitted = false;
      }, error => {
        console.log(error);
      });
  }

  clear() {
    this.submitted = false;

    this.searchForm.setValue({
      idStateSAT: 0,
      version: '',
      issueDateFrom: null,
      issueDateTo: null,
      ringingDateFrom: null,
      ringingDateTo: null,
      uuid: '',
      issueRfc: '',
      issue: '',
      expeditionPlace: '',
      receiverRfc: '',
      receiver: '',
      use: '',
      total: null,
      currency: ''
    });
  }

  checkHeader(isCheckedHeader: boolean) {
    this.cfdis.content.forEach(cfdi => cfdi.isSelected = isCheckedHeader);
  }

  onChangePage(pageNumber: number) {
    this.page.page = pageNumber - 1;

    let filters = new CfdiFilters();

    filters.idStateSAT = this.f.idStateSAT.value != 0 ? this.f.idStateSAT.value : null;
    filters.version = this.f.version.value;
    filters.issueDateFrom = this.f.issueDateFrom.value ? new Date(this.f.issueDateFrom.value.year, this.f.issueDateFrom.value.month - 1, this.f.issueDateFrom.value.day) : null;
    filters.issueDateTo = this.f.issueDateTo.value ? new Date(this.f.issueDateTo.value.year, this.f.issueDateTo.value.month - 1, this.f.issueDateTo.value.day) : null;
    filters.ringingDateFrom = this.f.ringingDateFrom.value ? new Date(this.f.ringingDateFrom.value.year, this.f.ringingDateFrom.value.month - 1, this.f.ringingDateFrom.value.day) : null;
    filters.ringingDateTo = this.f.ringingDateTo.value ? new Date(this.f.ringingDateTo.value.year, this.f.ringingDateTo.value.month - 1, this.f.ringingDateTo.value.day) : null;
    filters.uuid = this.f.uuid.value;
    filters.issueRfc = this.f.issueRfc.value;
    filters.issue = this.f.issue.value;
    filters.expeditionPlace = this.f.expeditionPlace.value;
    filters.receiverRfc = this.f.receiverRfc.value;
    filters.receiver = this.f.receiver.value;
    filters.use = this.f.use.value;
    filters.total = this.f.total.value;
    filters.currency = this.f.currency.value;

    this.cfdiService
      .getAllCfdis(
        this.page,
        filters
      )
      .subscribe(data => {
        this.cfdis = data;
      }, error => {
        console.log(error);
      });
  }

  onChangePageSize(pageSize: number) {
    this.page.size = pageSize;

    let filters = new CfdiFilters();

    filters.idStateSAT = this.f.idStateSAT.value != 0 ? this.f.idStateSAT.value : null;
    filters.version = this.f.version.value;
    filters.issueDateFrom = this.f.issueDateFrom.value ? new Date(this.f.issueDateFrom.value.year, this.f.issueDateFrom.value.month - 1, this.f.issueDateFrom.value.day) : null;
    filters.issueDateTo = this.f.issueDateTo.value ? new Date(this.f.issueDateTo.value.year, this.f.issueDateTo.value.month - 1, this.f.issueDateTo.value.day) : null;
    filters.ringingDateFrom = this.f.ringingDateFrom.value ? new Date(this.f.ringingDateFrom.value.year, this.f.ringingDateFrom.value.month - 1, this.f.ringingDateFrom.value.day) : null;
    filters.ringingDateTo = this.f.ringingDateTo.value ? new Date(this.f.ringingDateTo.value.year, this.f.ringingDateTo.value.month - 1, this.f.ringingDateTo.value.day) : null;
    filters.uuid = this.f.uuid.value;
    filters.issueRfc = this.f.issueRfc.value;
    filters.issue = this.f.issue.value;
    filters.expeditionPlace = this.f.expeditionPlace.value;
    filters.receiverRfc = this.f.receiverRfc.value;
    filters.receiver = this.f.receiver.value;
    filters.use = this.f.use.value;
    filters.total = this.f.total.value;
    filters.currency = this.f.currency.value;

    if (this.cfdis.content.length > 0) {
      this.cfdiService
        .getAllCfdis(
          this.page,
          filters
        )
        .subscribe(data => {
          this.cfdis = data;
        }, error => {
          console.log(error);
        });
    }
  }

  addDownload() {
    let items: number[] = [];
    this.cfdis.content.forEach(paysheet => {
      if (paysheet.isSelected) {
        items.push(paysheet.id);
      }
    });

    let filters = new CfdiFilters();
    filters.idStateSAT = null;

    this.donwloadService
      .addCfdiDownload(
        items,
        filters)
      .subscribe(data => {
        const modalRef = this.modalService.open(ModalMessageComponent);
        modalRef.componentInstance.title = 'Descargas';
        modalRef.componentInstance.message = 'Se ha agregado la descarga con exito.';
      }, error => {
        console.log(error);
      });
  }

  addAllCfdisDownload() {
    let items: number[] = [];

    let filters = new CfdiFilters();

    filters.idStateSAT = this.f.idStateSAT.value != 0 ? this.f.idStateSAT.value : null;
    filters.version = this.f.version.value;
    filters.issueDateFrom = this.f.issueDateFrom.value ? new Date(this.f.issueDateFrom.value.year, this.f.issueDateFrom.value.month - 1, this.f.issueDateFrom.value.day) : null;
    filters.issueDateTo = this.f.issueDateTo.value ? new Date(this.f.issueDateTo.value.year, this.f.issueDateTo.value.month - 1, this.f.issueDateTo.value.day) : null;
    filters.ringingDateFrom = this.f.ringingDateFrom.value ? new Date(this.f.ringingDateFrom.value.year, this.f.ringingDateFrom.value.month - 1, this.f.ringingDateFrom.value.day) : null;
    filters.ringingDateTo = this.f.ringingDateTo.value ? new Date(this.f.ringingDateTo.value.year, this.f.ringingDateTo.value.month - 1, this.f.ringingDateTo.value.day) : null;
    filters.uuid = this.f.uuid.value;
    filters.issueRfc = this.f.issueRfc.value;
    filters.issue = this.f.issue.value;
    filters.expeditionPlace = this.f.expeditionPlace.value;
    filters.receiverRfc = this.f.receiverRfc.value;
    filters.receiver = this.f.receiver.value;
    filters.use = this.f.use.value;
    filters.total = this.f.total.value;
    filters.currency = this.f.currency.value;

    this.donwloadService
      .addCfdiDownload(
        items,
        filters)
      .subscribe(data => {
        const modalRef = this.modalService.open(ModalMessageComponent);
        modalRef.componentInstance.title = 'Descargas';
        modalRef.componentInstance.message = 'Se ha agregado la descarga con exito.';
      }, error => {
        console.log(error);
      });
  }

  get checkDownload() {
    return this.cfdis.content.filter(cfdi => cfdi.isSelected).length > 0;
  }

  get checkAllDownload() {
    return this.cfdis.content.length > 0;
  }

  logout() {
    this.userService.logoutUser();
    this.router.navigate(['/home']);
  }

  get isAdmin() {
    return this.user && (this.user.role === Role.Admin);
  }

  get isCfdi() {
    return this.user && (this.user.role === Role.Cfdi || this.user.role === Role.Admin);
  }

  get isPaysheet() {
    return this.user && (this.user.role === Role.Paysheet || this.user.role === Role.Admin);
  }
}
