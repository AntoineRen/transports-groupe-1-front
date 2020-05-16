export class Periode {

  debut: Date;
  fin: Date;

  constructor(debut: Date, fin: Date){

    this.debut = debut;
    this.fin = fin;
  }

  public getDiffTimeInSeconde(){

    return (this.fin.valueOf() - this.debut.valueOf()) / 1000 ;
  }

}
