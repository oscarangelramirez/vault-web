import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.scss']
})
export class ModalMessageComponent implements OnInit {
  @Input() title;
  @Input() message;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  
  accept(){
    this.activeModal.close(true)
  }

  cancel(){
    this.activeModal.close(false)
  }
}
