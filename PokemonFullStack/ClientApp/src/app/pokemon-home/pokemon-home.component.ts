import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-home',
  templateUrl: './pokemon-home.component.html',
  styleUrls: ['./pokemon-home.component.css']
})
export class PokemonHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showDialog(){
    let modal_t  = document.getElementById('modal_1');

    modal_t.classList.remove('hhiden');
    console.log(modal_t);
    modal_t.classList.add('sshow');
}
  closeDialog() {
      let modal_t  = document.getElementById('modal_1')
      modal_t.classList.remove('sshow')
      modal_t.classList.add('hhiden');
  }
}
