import { Component, OnInit, Type, ElementRef, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbTimeStruct, NgbModal, ModalDismissReasons, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AnnonceService } from './annonce.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pub-annonce',
  templateUrl: './pub-annonce.component.html',
  styleUrls: ['./pub-annonce.component.scss']
})
export class PubAnnonceComponent implements OnInit {
  time: NgbTimeStruct;
  annonce: any = {} ;
  public dateTime: Date;
  hourStep = 1;
  minuteStep = 10;
  dateDepart: NgbDateStruct;
  closeResult = '';
  dateDepart2;

  constructor(private annonceService: AnnonceService, private modalService: NgbModal) {

  }

  private step(i: number): string {
    return i < 10 ? `0${i}` : `${i}`;
  }

  toModelTime(time: NgbTimeStruct): string {
    if (!time) {
      return null;
    }
    return `${this.step(time.hour)}:${this.step(time.minute)}`;
  }

  toModelDate(date: NgbDateStruct): string {
    if (!date) {
      return null;
    }
    return `${this.step(date.year)}-${this.step(date.month)}-${this.step(date.day)}`;
  }

   creerAnnonce(myform){
    this.annonce.dateDepart = `${this.toModelDate(this.dateDepart)}T${this.toModelTime(this.time)}`;
    this.annonce.dureeTrajet = 2;
    this.annonce.distance = 2;
    this.annonce.responsable_id = 1;
    this.annonceService.creerAnnonceCovoiturage(this.annonce).subscribe(() => {
     myform.reset();
    },
    error => {
      console.log('Nok');
    });
  }

  open(content, myform) {
    this.dateDepart2 = `${this.toModelDate(this.dateDepart)} ${this.toModelTime(this.time)}`;
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.creerAnnonce(myform);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  ngOnInit(): void {

  }

}
