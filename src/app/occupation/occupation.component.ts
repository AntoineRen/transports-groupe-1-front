import { Component, OnInit, ViewChild } from '@angular/core';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { OccupationChauffeurService } from './service/occupation-chauffeur.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Periode } from './domains/periode.domains';
import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-occupation',
  templateUrl: './occupation.component.html',
  styleUrls: ['./occupation.component.scss']
})
export class OccupationComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;

  // date picker
  dateDebut: NgbDateStruct;
  dateFin: NgbDateStruct;

  // fontawesome
  faCalendarAlt = faCalendarAlt;

  // apexchart
  options = {
    chart: {
      type: 'line'
    },
    series: [{
      name: 'Taux d\'occupation ',
      data: []
    }],
    xaxis: {
      categories: []
    },
    stroke: {
      curve: 'smooth',
    },
    colors:['#408874', '#408874', '#408874']
  };

  // Map jour/seconde occupé
  mapOccupation: Map<string, number> = new Map();

  // Map jour/taux
  mapTauxOccupation: Map<string, number> = new Map();

  moyenne: string;

  // erreurs
  erreurPeriode = false;
  erreurGetReservations = false;

  constructor(private serviceOccupationChauffeur: OccupationChauffeurService) { }

  /** Effectue une requete pour obtenir les données de la période demandée et remplit le graphique */
  public getReservationsPeriode(dateDebut: NgbDateStruct, dateFin: NgbDateStruct){

    this.erreurGetReservations = false;

    this.serviceOccupationChauffeur.getReservationsPeriode(dateDebut, dateFin).subscribe(
      (periodes) => {

        this.mapOccupation.clear();

        for (const periode of periodes){

          this.fillMapOccupation(periode);
        }

        this.fillMapTauxOccupation();
        this.fillChart();
        this.moyenne = this.moyenneOccupation();
      },
      () => this.erreurGetReservations = true,
    );
  }

  /** Vérifie que la période indiqué est une période correct et lance la requete */
  validerPeriode(dateDebut: NgbDateStruct, dateFin: NgbDateStruct){

    this.erreurPeriode = !dateDebut || !dateFin || !(this.ngbDateStructToDate(dateDebut) <= this.ngbDateStructToDate(dateFin));

    if (!this.erreurPeriode){

      this.getReservationsPeriode(dateDebut, dateFin);
    }
  }


  /** Remplit la map temps d'occupation [date, secondes] */
  private fillMapOccupation(periode: Periode){

    if (periode.debut.getDate() === periode.fin.getDate()){ // si reservation un seul jour

      const key = periode.debut.toLocaleDateString();

      if (this.mapOccupation.has(key)){ // si un jour déja présent

        this.mapOccupation.set(key, this.mapOccupation.get(key) + periode.getDiffTimeInSeconde());

        } else {
           this.mapOccupation.set(key, periode.getDiffTimeInSeconde());
        }

    } else { // si reservation plusieurs jours

      const finPremierJour: Date = new Date(periode.debut.toDateString());
      finPremierJour.setHours(23, 59, 59, 0);

      this.fillMapOccupation(new Periode(periode.debut, finPremierJour));

      const debutRestePeriode: Date = periode.debut;
      debutRestePeriode.setDate(debutRestePeriode.getDate() + 1);
      debutRestePeriode.setHours(0, 0, 0, 0);

      this.fillMapOccupation(new Periode(debutRestePeriode, periode.fin));

    }

  }

  /** Remplit la map [date,taux d'occupation] */
  private fillMapTauxOccupation(){

    this.mapTauxOccupation.clear();

    for (const [key, value] of this.mapOccupation.entries()){

      this.mapTauxOccupation.set(key, Math.trunc((value / 86399) * 100 ));
    }
  }

  /** Remplit la tableau de données et les catégories du graphiques */
  private fillChart(){

    // clear chart
    this.options.series[0].data = [];
    this.options.xaxis.categories = [];

    const jour = this.ngbDateStructToDate(this.dateDebut);
    const jourFin = this.ngbDateStructToDate(this.dateFin);

    while (jour <= jourFin ){

      if (this.mapTauxOccupation.has(jour.toLocaleDateString())){

        this.options.series[0].data.push(this.mapTauxOccupation.get(jour.toLocaleDateString()));
        this.options.xaxis.categories.push(jour.toLocaleDateString());
      }else{
        this.options.series[0].data.push(0);
        this.options.xaxis.categories.push(jour.toLocaleDateString());
      }

      jour.setDate(jour.getDate() + 1);
    }

    this.chart.updateOptions(this.options);
  }

  /** Calcul la moyenne des taux d'occupation de la période demandée */
  private moyenneOccupation(): string {

  let sommetaux = 0;

  for (const taux of this.options.series[0].data){

    sommetaux += taux;
  }

  return (sommetaux / this.options.series[0].data.length).toFixed(2);
  }

  private ngbDateStructToDate( ngbDate: NgbDateStruct){

    return new Date(ngbDate.year, ngbDate.month - 1 , ngbDate.day);
  }

  ngOnInit(): void {

    const today = new Date();
    const lundi = new Date(today.setDate(today.getDate() - today.getDay() + 1));
    const dimanche = new Date(today.setDate(today.getDate() - today.getDay() + 7));

    this.dateDebut = {year: lundi.getFullYear(), month: lundi.getMonth() + 1 , day: lundi.getDate()};
    this.dateFin = {year: dimanche.getFullYear(), month: dimanche.getMonth() + 1 , day: dimanche.getDate()};

    this.validerPeriode(this.dateDebut, this.dateFin);

  }

}
