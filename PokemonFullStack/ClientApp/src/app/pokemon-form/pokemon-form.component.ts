import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pokemon } from '../pokemon.interface';
import { PokemonsStorageService } from '../pokemons.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit, OnDestroy {

  constructor (private pokeStorage: PokemonsStorageService,
               private router:Router) {}

  ngOnInit(){

    if (this.pokeStorage.editMode) {
      this.pokemons.name = this.pokeStorage.pokemonsToBeEdited.name;
        this.pokemons.type = this.pokeStorage.pokemonsToBeEdited.type;
        this.pokemons.weight = this.pokeStorage.pokemonsToBeEdited.weight;
        this.pokemons.height = this.pokeStorage.pokemonsToBeEdited.height;
        this.pokemons.img = this.pokeStorage.pokemonsToBeEdited.img;
        this.btnText = "Edit";
    }
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
    // this.editSubscription = this.pokeStorage.editPokemonEvent.subscribe(
    //   () => {

    //   });
  }

  ngOnDestroy() {
    this.btnText = "Add"
  }

  pokemons = <Pokemon>{};
  editSubscription: Subscription;
  btnText = "Add";

  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;

  changeSuccessMessage(message) {
    this._success.next(`Pokemon successfully ${message} !`);
  }

  onSubmit(form){
    const newPokemon = {
      name: "",
      type: form.value.type,
      weight: form.value.weight,
      height: form.value.height,
      img: this.pokemons.img,
    }
    if (this.btnText === "Add") {
      newPokemon.name = form.value.name
    } else {
      newPokemon.name = this.pokeStorage.pokemonsToBeEdited.name;
    }
    this.pokeStorage.getImage(newPokemon.name)
      .subscribe(
      (value: any) => {
        newPokemon.img = value.sprites.front_default;
        this.pokeStorage.addToList(newPokemon);
        if (this.pokeStorage.editMode){
          this.changeSuccessMessage('edited');
        } else this.changeSuccessMessage('added');
        this.pokeStorage.pokemonsToBeEdited = <Pokemon>{};
        this.pokeStorage.editMode= false;
        if (form.value.changeTab) {
          this.router.navigate(['population']);
            }
        form.reset();
        this.btnText = "Add";
      },
      (err) => {
        alert('You are wrong');
        form.reset();
      }
      )
    }
}
