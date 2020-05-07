import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pokemon } from '../pokemon.interface';
import { PokemonsStorageService } from '../Services/pokemons.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TitleCasePipe, LowerCasePipe } from '@angular/common';
import { format } from 'url';



@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit, OnDestroy {

  constructor (private pokeStorage: PokemonsStorageService,
               private router:Router,
               private titlecase: TitleCasePipe,
               ) {}

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
  pokemonFound : boolean = false;
  newPokemon = {
    pokedexId: "",
    name: "",
    hp: "",
    speed: "",
    attack: "",
    defense: "",
    specialAttack:"",
    specialDefense:"",
    weight: "",
    height: "",
    imageURL: "",
    abilityName:"",
    abilityDescription:"",
    typeDTOs: [{TypeName: "Electric"}]
  }

  changeSuccessMessage(message) {
    this._success.next(`Pokemon successfully ${message} to the Database!`);
  }

  onSubmit(form){
    this.newPokemon.typeDTOs = [];
    this.newPokemon.imageURL = "";
    this.newPokemon.name = form.value.name;
    if (this.newPokemon.name != "") {
    this.pokeStorage.getBasicStats(this.newPokemon.name)
      .subscribe(
      (value: any) => {
        this.newPokemon.pokedexId = value.id,
        this.newPokemon.hp = value.stats[5].base_stat,
        this.newPokemon.speed = value.stats[0].base_stat,
        this.newPokemon.attack = value.stats[4].base_stat,
        this.newPokemon.defense = value.stats[3].base_stat,
        this.newPokemon.specialAttack = value.stats[2].base_stat,
        this.newPokemon.specialDefense =  value.stats[1].base_stat,
        ///TO DO - CHECK WEIGHT AND HEIGHT MEASUREMENT UNITS
        this.newPokemon.weight = value.weight;
        this.newPokemon.height = value.height;
        this.newPokemon.imageURL = value.sprites.front_default,
        this.newPokemon.abilityName = value.abilities[0].ability.name,
        this.pokeStorage.getAbilityDescription(value.abilities[0].ability.url)
          .subscribe(
            (abilityValue:any) => {
          console.log("Re-requesting HTTP");
          this. newPokemon.abilityDescription= abilityValue.effect_entries[0].effect;
          });
        value.types.map(mapTypes =>
          this.newPokemon.typeDTOs.push({TypeName: this.titlecase.transform(mapTypes.type.name)}));
        console.log(this.newPokemon);

        this.pokemonFound = true;
        form.reset();
        // this.pokeStorage.addToList(newPokemon);
        // if (this.pokeStorage.editMode){
        //   this.changeSuccessMessage('edited');
        // } else this.changeSuccessMessage('added');
        // this.pokeStorage.pokemonsToBeEdited = <Pokemon>{};
        // this.pokeStorage.editMode= false;
        // if (form.value.changeTab) {
        //   this.router.navigate(['population']);
        //     }
        // form.reset();
        // this.btnText = "Add";
      },
      (err) => {
        this.pokemonFound = false;
        alert('There is no such pokemon');
        form.reset();
      }
      )}
      else this.pokemonFound = false;
      form.reset();

    }

    addToDB(newPokemon){
      this.pokeStorage.sendPostRequest(newPokemon).subscribe(result => {
        this.changeSuccessMessage('added');
        this.pokemonFound = false;

        console.log(result);});



    }
}
