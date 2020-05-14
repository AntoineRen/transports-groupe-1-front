import { Component, OnInit } from '@angular/core';
import { CovoitAnnonce } from 'src/app/list-reservation-covoiturages/models/CovoitAnnonce.model';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AnnonceCovoitService } from '../../service/annonce-covoit.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reserver-un-covoit-modal',
  templateUrl: './reserver-un-covoit-modal.component.html',

})
export class ReserverUnCovoitModalComponent {

  /*Input récuppéran une annonce passé par le bouton "Detail" */
  annonce: CovoitAnnonce;
  errorPutReservation = false;

  constructor(private modalService: NgbModal,
              public activeModal: NgbActiveModal,
              private servicePut: AnnonceCovoitService) { }



  //TODO possibilité de récuupérer l'annonce aprés le put
  putReservation(annonceReservation: CovoitAnnonce) {

    this.servicePut.putReservation(annonceReservation.idAnnonce)
      .subscribe((annonce) => {
        this.errorPutReservation = false;
        this.servicePut.getAllAnnonceCovoitEnCourse();
      },
        () => { this.errorPutReservation = true; });
  }

}
