import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, RequiredValidator, AbstractControl } from '@angular/forms';
import { Chauffeur } from './chauffeur';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LesChauffeursService } from './les-chauffeurs.service';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-les-chauffeurs',
  templateUrl: './les-chauffeurs.component.html',
  styleUrls: ['./les-chauffeurs.component.scss']
})
export class LesChauffeursComponent implements OnInit {

  closeResult = '';
  chauffeurs: Chauffeur[];
  filterChauffeurs: Chauffeur[];

  formChauffeur = new FormGroup({
    matricule: new FormControl(''),
    nom: new FormControl(''),
    prenom: new FormControl('')
  });

  formChauffeurAdd = new FormGroup({
    matriculee: new FormControl('', [Validators.required])
  });

  constructor(private modalService: NgbModal, private leschauffeur: LesChauffeursService, private toastr: ToastrService) {
    this.formChauffeur.valueChanges.pipe(
      map(() => {
        let filterChauffeurTemp: Chauffeur[];
        filterChauffeurTemp = this.FilterChauffeur(
          this.formChauffeur.get('matricule').value,
          this.formChauffeur.get('nom').value,
          this.formChauffeur.get('prenom').value);
        return filterChauffeurTemp;
      })
    ).subscribe(object => this.filterChauffeurs = object);
  }

  FilterChauffeur(mat: string, nom: string, prenom: string): Chauffeur[] {
    let tempFilter: Chauffeur[];
    tempFilter = this.chauffeurs.filter(chauffeur => chauffeur.matricule.toLocaleLowerCase().includes(mat.toLocaleLowerCase()));
    tempFilter = tempFilter.filter(chauffeur => chauffeur.nom.toLocaleLowerCase().includes(nom.toLocaleLowerCase()));
    tempFilter = tempFilter.filter(chauffeur => chauffeur.prenom.toLocaleLowerCase().includes(prenom.toLocaleLowerCase()));
    return tempFilter;
  }

  open(content, formAnn) {
    this.modalService.open(content).result.then(() => {
      this.creerChauffeur(formAnn.value.matriculee);
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

  creerChauffeur(mat) {
    this.leschauffeur.creerChauffeur(mat).subscribe(res =>
      this.toastr.success('Le chauffeur a été créé avec succès.', 'Chauffeur'),
      error =>
        this.toastr.error("Une erreur s'est produite lors de la création d'un chauffeur.", 'Chauffeur')

      );
  }

  ngOnInit(): void {
    this.leschauffeur.getAllChauffeur()
      .subscribe(res => {
      this.chauffeurs = res
        .map(lechauffeur => new Chauffeur(lechauffeur));
        this.filterChauffeurs = this.chauffeurs.slice();
    });
  }

}
