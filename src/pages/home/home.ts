import { Component } from '@angular/core';
import {NavController, reorderArray} from 'ionic-angular';
import { ANIMALES } from "../../data/data.animales";
import { Animal } from "../../interfaces/Animal";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public animales: Animal[] = [];
  public audio = new Audio();
  public audioTiempo : any;
  public ordenando : boolean = false;

  constructor(public navCtrl: NavController) {

    this.animales = ANIMALES.slice(0);

  }

  public reproducir( animal: Animal) {

    this.pausarAudio(animal);

    if (animal.reproduciendo){
      animal.reproduciendo = false;
    return;
  }
    this.audio.src = animal.audio;
    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;

    this.audioTiempo = setTimeout( () => animal.reproduciendo = false, animal.duracion * 1000);

  }

  private pausarAudio(animalSel : Animal){

    clearTimeout( this.audioTiempo );

    this.audio.pause();
    this.audio.currentTime = 0;

    for (let animal of this.animales)
      if (animal.nombre != animalSel.nombre)
           animal.reproduciendo = false;
  }

  public elimina( idx: number){
    this.animales.splice( idx, 1 );
  }

  public recargar( refresher : any){

    console.log("Inicio del refresh");

    setTimeout( () => {
      console.log("Termino el refresh");
      this.animales = ANIMALES.slice(0);

      refresher.complete();
    }, 1500);

  }

  public reordenar ( indices: any ){
    this.animales = reorderArray(this.animales, indices);
  }

}
