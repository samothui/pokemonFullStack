import { Injectable } from '@angular/core';
import { Pokemon, Pokedex } from '../pokemon.interface';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { TitleCasePipe, LowerCasePipe } from '@angular/common';




@Injectable({
  providedIn: 'root'
})
export class PokemonsStorageService {

  constructor (
    private http: HttpClient,
    private titlecase: TitleCasePipe,
    private lowercase: LowerCasePipe){}

  pokemons:Array<Pokemon> = []
  pokemonsToBeEdited: Pokemon;
  pokemonsPokedex= <Pokedex>{};
  editMode = false;

  addRandomPokemon(){
    this.http.get('http://localhost:51886/api/pokemons').subscribe(
      (Response:any) =>{
        console.log(Response);
        Response.forEach(pokemonResponse => {
          let newPokemon = {
            name: pokemonResponse.Name,
            weight: pokemonResponse.Weight/10,
            height: pokemonResponse.Height/10,
            img: pokemonResponse.ImageUrl,
            type: []
          }
          pokemonResponse.TypeDTOs.map(values =>
            newPokemon.type.push(values.TypeName));
          this.addToList(newPokemon);
        })


      }
    )
  }


  getBasicStats(pokemonName){
    let lowerName = this.lowercase.transform(pokemonName);
    return this.http.get('https://pokeapi.co/api/v2/pokemon/'+lowerName);}

  getAbilityDescription(abilityURL){
    return this.http.get(abilityURL);
  }

  sendPostRequest(newPokemon){
    let url = 'http://localhost:51886/api/pokemons';
    return this.http.post(url, newPokemon);
  }

  sendDeleteRequest(name){
    let url = 'http://localhost:51886/api/pokemons/';
    return this.http.delete(url+name);
  }

  addToEditList(pokemon) {
    this.pokemonsToBeEdited = pokemon;
    this.editMode = true;
  }

  addToPokedex(pokemon) {
    let lowerName = this.lowercase.transform(pokemon.name);
    return this.http.get('http://localhost:51886/api/pokemons/name/'+lowerName);
  }

  addToList(pokemonToBeAdded) {
    const pos = this.pokemons.findIndex((pokemon)=>{
      return pokemon.name === pokemonToBeAdded.name;
    })
    if (pos !== -1){
      this.pokemons[pos] = pokemonToBeAdded;
      return;
    }
    this.pokemons.push(pokemonToBeAdded);
  }

  clear(){
    this.pokemons = [];
  }


}
