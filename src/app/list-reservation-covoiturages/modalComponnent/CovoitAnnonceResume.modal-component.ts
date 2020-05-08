import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CovoitAnnonce} from '../models/covoitAnnonce.model';


@Component({
  selector: 'app-ngbd-modal-content',
  templateUrl: './CovoitAnnonceResume.modal-component.html',

})
// tslint:disable-next-line: component-class-suffix
export class CovoitAnnonceResume {

  /*Input récuppéran une annonce passé par le bouton "Detail" */
  annonce: CovoitAnnonce;

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) { }


}
