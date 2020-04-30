import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Pokemon, Pokedex } from '../pokemon.interface';
import { PokemonsStorageService } from '../pokemons.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {

  constructor( public activeModal: NgbActiveModal,
              private pokeStorage: PokemonsStorageService) { }

  ngOnInit(): void {
    this.pokedexPokemon = this.pokeStorage.pokemonsPokedex;
    console.log(this.pokedexPokemon.type);
  }

  pokedexPokemon: Pokedex;



}
