import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ModalMessageComponent } from '../../modals/modal-message/modal-message.component';
import { PaysheetService } from 'src/app/services/paysheet.service';
import { DownloadService } from 'src/app/services/download.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import User from 'src/app/models/user';
import Paysheets from 'src/app/models/paysheets';
import PaysheetFilters from 'src/app/models/paysheet.filters';
import Page from 'src/app/models/page';
import { Role } from 'src/app/models/role';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-paysheet-get-all',
  templateUrl: './paysheet-get-all.component.html',
  styleUrls: ['./paysheet-get-all.component.scss']
})
export class PaysheetGetAllComponent implements OnInit {
  @ViewChild('fileEmployeeNumber', { static: false })
  fileEmployeeNumber: ElementRef;

  page: Page = new Page();
  paysheets: Paysheets = new Paysheets();
  searchForm: FormGroup;
  submitted = false;

  fileEmployeeMessage: string;
  toogle: boolean;
  isCheckedHeader: boolean;
  user: User;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private paysheetService: PaysheetService,
    private donwloadService: DownloadService,
    private userService: UserService) { }

  ngOnInit() {
    this.userService.user$.subscribe(user => this.user = user);

    this.searchForm = this.formBuilder.group({
      idStateSAT: [0],
      issueDateFrom: [null],
      issueDateTo: [null],
      uuid: ['', [Validators.pattern('[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}')]],
      receiverRfc: ['', [Validators.pattern('[A-Z&Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]')]],
      receiver: [''],
      employerRegister: [''],
      type: [''],
      paymentDateFrom: [null],
      paymentDateTo: [null],
      total: [null, [Validators.pattern('[0-9]{1,18}(.[0-9]{1,6})?')]],
      version: [''],
      currency: [''],
      receiverCurp: ['', [Validators.pattern('[A-Z][AEIOUX][A-Z]{2}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[MH]([ABCMTZ]S|[BCJMOT]C|[CNPST]L|[GNQ]T|[GQS]R|C[MH]|[MY]N|[DH]G|NE|VZ|DF|SP)[BCDFGHJ-NP-TV-Z]{3}[0-9A-Z][0-9]')]],
      socialSecurityNumber: [''],
      employeeNumber: [''],
      department: [''],
      numberDaysPaid: [null, [Validators.pattern('[0-9]{1,2}')]]
    });

    this.fileEmployeeMessage = 'Seleccione el archivo';
  }

  get f() { return this.searchForm.controls; }

  search() {
    this.submitted = true;

    if (this.searchForm.invalid) {
      return;
    }

    this.page.page = 0;

    let filters = new PaysheetFilters();

    filters.idStateSAT = this.f.idStateSAT.value != 0 ? this.f.idStateSAT.value : null;
    filters.issueDateFrom = this.f.issueDateFrom.value ? new Date(this.f.issueDateFrom.value.year, this.f.issueDateFrom.value.month - 1, this.f.issueDateFrom.value.day) : null;
    filters.issueDateTo = this.f.issueDateTo.value ? new Date(this.f.issueDateTo.value.year, this.f.issueDateTo.value.month - 1, this.f.issueDateTo.value.day) : null;
    filters.uuid = this.f.uuid.value;
    filters.receiverRfc = this.f.receiverRfc.value;
    filters.receiver = this.f.receiver.value;
    filters.employerRegister = this.f.employerRegister.value;
    filters.type = this.f.type.value;
    filters.paymentDateFrom = this.f.paymentDateFrom.value ? new Date(this.f.paymentDateFrom.value.year, this.f.paymentDateFrom.value.month - 1, this.f.paymentDateFrom.value.day) : null;
    filters.paymentDateTo = this.f.paymentDateTo.value ? new Date(this.f.paymentDateTo.value.year, this.f.paymentDateTo.value.month - 1, this.f.paymentDateTo.value.day) : null;
    filters.total = this.f.total.value;
    filters.version = this.f.version.value;
    filters.currency = this.f.currency.value;
    filters.receiverCurp = this.f.receiverCurp.value;
    filters.socialSecurityNumber = this.f.socialSecurityNumber.value;
    filters.employeeNumber = this.f.employeeNumber.value;
    filters.department = this.f.department.value;
    filters.numberDaysPaid = this.f.numberDaysPaid.value;

    this.paysheetService
      .getAllPaysheets(
        this.page,
        filters
      )
      .subscribe(data => {
        this.paysheets = data;
        this.submitted = false;
      }, error => {
        console.log(error);
      });
  }

  clear() {
    this.submitted = false;

    this.searchForm.setValue({
      idStateSAT: 0,
      issueDateFrom: null,
      issueDateTo: null,
      uuid: '',
      receiverRfc: '',
      receiver: '',
      employerRegister: '',
      type: '',
      paymentDateFrom: null,
      paymentDateTo: null,
      total: null,
      version: '',
      currency: '',
      receiverCurp: '',
      socialSecurityNumber: '',
      employeeNumber: '',
      department: '',
      numberDaysPaid: ''
    });

    this.fileEmployeeMessage = 'Seleccione el archivo';
    this.fileEmployeeNumber.nativeElement.value = '';
  }

  checkHeader(isCheckedHeader: boolean) {
    this.paysheets.content.forEach(paysheet => paysheet.isSelected = isCheckedHeader);
  }

  onChangePage(pageNumber: number) {
    this.page.page = pageNumber - 1;

    let filters = new PaysheetFilters();

    filters.idStateSAT = this.f.idStateSAT.value != 0 ? this.f.idStateSAT.value : null;
    filters.issueDateFrom = this.f.issueDateFrom.value ? new Date(this.f.issueDateFrom.value.year, this.f.issueDateFrom.value.month - 1, this.f.issueDateFrom.value.day) : null;
    filters.issueDateTo = this.f.issueDateTo.value ? new Date(this.f.issueDateTo.value.year, this.f.issueDateTo.value.month - 1, this.f.issueDateTo.value.day) : null;
    filters.uuid = this.f.uuid.value;
    filters.receiverRfc = this.f.receiverRfc.value;
    filters.receiver = this.f.receiver.value;
    filters.employerRegister = this.f.employerRegister.value;
    filters.type = this.f.type.value;
    filters.paymentDateFrom = this.f.paymentDateFrom.value ? new Date(this.f.paymentDateFrom.value.year, this.f.paymentDateFrom.value.month - 1, this.f.paymentDateFrom.value.day) : null;
    filters.paymentDateTo = this.f.paymentDateTo.value ? new Date(this.f.paymentDateTo.value.year, this.f.paymentDateTo.value.month - 1, this.f.paymentDateTo.value.day) : null;
    filters.total = this.f.total.value;
    filters.version = this.f.version.value;
    filters.currency = this.f.currency.value;
    filters.receiverCurp = this.f.receiverCurp.value;
    filters.socialSecurityNumber = this.f.socialSecurityNumber.value;
    filters.employeeNumber = this.f.employeeNumber.value;
    filters.department = this.f.department.value;
    filters.numberDaysPaid = this.f.numberDaysPaid.value;

    this.paysheetService
      .getAllPaysheets(
        this.page,
        filters
      )
      .subscribe(data => {
        this.paysheets = data;
      }, error => {
        console.log(error);
      });
  }

  onChangePageSize(pageSize: number) {
    this.page.size = pageSize;

    let filters = new PaysheetFilters();

    filters.idStateSAT = this.f.idStateSAT.value != 0 ? this.f.idStateSAT.value : null;
    filters.issueDateFrom = this.f.issueDateFrom.value ? new Date(this.f.issueDateFrom.value.year, this.f.issueDateFrom.value.month - 1, this.f.issueDateFrom.value.day) : null;
    filters.issueDateTo = this.f.issueDateTo.value ? new Date(this.f.issueDateTo.value.year, this.f.issueDateTo.value.month - 1, this.f.issueDateTo.value.day) : null;
    filters.uuid = this.f.uuid.value;
    filters.receiverRfc = this.f.receiverRfc.value;
    filters.receiver = this.f.receiver.value;
    filters.employerRegister = this.f.employerRegister.value;
    filters.type = this.f.type.value;
    filters.paymentDateFrom = this.f.paymentDateFrom.value ? new Date(this.f.paymentDateFrom.value.year, this.f.paymentDateFrom.value.month - 1, this.f.paymentDateFrom.value.day) : null;
    filters.paymentDateTo = this.f.paymentDateTo.value ? new Date(this.f.paymentDateTo.value.year, this.f.paymentDateTo.value.month - 1, this.f.paymentDateTo.value.day) : null;
    filters.total = this.f.total.value;
    filters.version = this.f.version.value;
    filters.currency = this.f.currency.value;
    filters.receiverCurp = this.f.receiverCurp.value;
    filters.socialSecurityNumber = this.f.socialSecurityNumber.value;
    filters.employeeNumber = this.f.employeeNumber.value;
    filters.department = this.f.department.value;
    filters.numberDaysPaid = this.f.numberDaysPaid.value;

    if (this.paysheets.content.length > 0) {
      this.paysheetService
        .getAllPaysheets(
          this.page,
          filters
        )
        .subscribe(data => {
          this.paysheets = data;
        }, error => {
          console.log(error);
        });
    }
  }

  changeEmployeeNumber(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/text\/*/) == null) {
      const modalRef = this.modalService.open(ModalMessageComponent);
      modalRef.componentInstance.title = 'Nóminas';
      modalRef.componentInstance.message = 'Solo archivos de texto son permitidos';
      return;
    }

    var reader = new FileReader();
    reader.readAsText(files[0]);
    reader.onload = (_event) => {
      var lines = reader.result.toString().split('\n');
      this.f.employeeNumber.setValue(lines.join('|'));

      this.fileEmployeeMessage = 'Archivo cargado';
    }
  }

  addDownload() {
    let items: number[] = [];
    this.paysheets.content.forEach(paysheet => {
      if (paysheet.isSelected) {
        items.push(paysheet.id);
      }
    });

    let filters = new PaysheetFilters();
    filters.idStateSAT = null;

    this.donwloadService
      .addPaysheetDownload(
        items,
        filters)
      .subscribe(data => {
        const modalRef = this.modalService.open(ModalMessageComponent);
        modalRef.componentInstance.title = 'Descargas';
        modalRef.componentInstance.message = 'Se ha agregado la descarga con exito.';
      }, error => {
        console.log(error);
      })
  }

  addAllPaysheetsDownload() {
    let items: number[] = [];

    let filters = new PaysheetFilters();

    filters.idStateSAT = this.f.idStateSAT.value != 0 ? this.f.idStateSAT.value : null;
    filters.issueDateFrom = this.f.issueDateFrom.value ? new Date(this.f.issueDateFrom.value.year, this.f.issueDateFrom.value.month - 1, this.f.issueDateFrom.value.day) : null;
    filters.issueDateTo = this.f.issueDateTo.value ? new Date(this.f.issueDateTo.value.year, this.f.issueDateTo.value.month - 1, this.f.issueDateTo.value.day) : null;
    filters.uuid = this.f.uuid.value;
    filters.receiverRfc = this.f.receiverRfc.value;
    filters.receiver = this.f.receiver.value;
    filters.employerRegister = this.f.employerRegister.value;
    filters.type = this.f.type.value;
    filters.paymentDateFrom = this.f.paymentDateFrom.value ? new Date(this.f.paymentDateFrom.value.year, this.f.paymentDateFrom.value.month - 1, this.f.paymentDateFrom.value.day) : null;
    filters.paymentDateTo = this.f.paymentDateTo.value ? new Date(this.f.paymentDateTo.value.year, this.f.paymentDateTo.value.month - 1, this.f.paymentDateTo.value.day) : null;
    filters.total = this.f.total.value;
    filters.version = this.f.version.value;
    filters.currency = this.f.currency.value;
    filters.receiverCurp = this.f.receiverCurp.value;
    filters.socialSecurityNumber = this.f.socialSecurityNumber.value;
    filters.employeeNumber = this.f.employeeNumber.value;
    filters.department = this.f.department.value;
    filters.numberDaysPaid = this.f.numberDaysPaid.value;

    this.donwloadService
      .addPaysheetDownload(
        items,
        filters)
      .subscribe(data => {
        const modalRef = this.modalService.open(ModalMessageComponent);
        modalRef.componentInstance.title = 'Descargas';
        modalRef.componentInstance.message = 'Se ha agregado la descarga con exito.';
      }, error => {
        console.log(error);
      })
  }

  get checkDownload() {
    return this.paysheets.content.filter(paysheet => paysheet.isSelected).length > 0;
  }

  get checkAllDownload() {
    return this.paysheets.content.length > 0;
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
