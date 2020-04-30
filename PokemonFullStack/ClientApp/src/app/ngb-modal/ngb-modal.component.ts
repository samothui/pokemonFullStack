import {Component} from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngb-modal',
  templateUrl: './ngb-modal.component.html'
})
export class NgbModalComponent {

  constructor(private modalService: NgbModal) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

}
