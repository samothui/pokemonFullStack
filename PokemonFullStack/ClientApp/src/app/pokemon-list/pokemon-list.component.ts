import { Component, OnInit, ViewChildren, QueryList, PipeTransform} from '@angular/core';
import { Pokemon, SortEvent, compare } from '../pokemon.interface';
import { PokemonsStorageService } from '../Services/pokemons.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PokedexComponent } from '../pokedex/pokedex.component';
import { TitleCasePipe, DecimalPipe } from '@angular/common';
import { SortableHeaderDirective } from '../sortable-header.directive';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  constructor(private pokeStorage: PokemonsStorageService,
              private router: Router,
              private modalService: NgbModal,
              private titlecase: TitleCasePipe,
              public pipe: DecimalPipe,
              ) { }


  ngOnInit(){
    this.filter.valueChanges
      .subscribe (
        (Response) =>
        {
          if (this.filter.value !== ''){
            this.pokemons = this.pokeStorage.pokemons;
            this.pokemons = this.search(this.filter.value, this.pipe)
          } else this.pokemons = this.pokeStorage.pokemons;

        });
  }

  @ViewChildren (SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;
  pokemons:Array<Pokemon> = this.pokeStorage.pokemons;


  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    // sorting headers
    if (direction === '') {
      if (this.filter.value){
        this.pokemons = this.search(this.filter.value, this.pipe)
      } else this.pokemons = this.pokeStorage.pokemons;
    } else {
      this.pokemons = [...this.pokemons].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  openPokedex(pokemon) {
    console.log('list');
    this.pokeStorage.addToPokedex(pokemon)
    .subscribe(
      (Response:any) =>{
        console.log(Response);
        let pokePokedex = {
          name:Response.Name,
          type:[],
          order:Response.PokedexId,
          weight:pokemon.weight,
          height:pokemon.height,
          img: Response.ImageUrl,
          stSpeed: Response.Speed,
          stSPDef: Response.SpecialDefense,
          stSPAtt: Response.SpecialAttack,
          stDef: Response.Defense,
          stAtt: Response.Attack,
          stHP: Response.HP,
          ability: Response.AbilityName,
          abilityDesc: Response.AbilityDescription
        }
        Response.TypeDTOs.map(values =>
          pokePokedex.type.push(values.TypeName));
        this.pokeStorage.pokemonsPokedex=pokePokedex;
        console.log(this.pokeStorage.pokemonsPokedex);
        this.modalService.open(PokedexComponent, { size: 'lg' });
      }
    );
  }

  deletePokemon (name){
    this.pokeStorage.sendDeleteRequest(name).subscribe(result => {
      for (var i =0; i < this.pokeStorage.pokemons.length; i++)
      if (this.pokeStorage.pokemons[i].name === name) {
       this.pokeStorage.pokemons.splice(i,1);
       break;
        }
        this.pokemons = this.pokeStorage.pokemons;
        console.log(this.pokeStorage.pokemons);

      ;});
  }
  // editPokemon(pokemon){
  //   this.pokeStorage.addToEditList(pokemon);
  //   this.router.navigate(['form']);
  // }

  randomPoke(){
    this.pokeStorage.addRandomPokemon();
    this.pokemons = this.pokeStorage.pokemons;
  }

  search(text: string, pipe: PipeTransform): Array<Pokemon> {
    console.log('searching');
    console.log('valueofform is: ' + text);
    return this.pokemons.filter(pokemon => {
      let term = text.toLowerCase();
      return pokemon.name.toLowerCase().includes(term)
          || this.returnTypePoke(term, pokemon)
          || pipe.transform(pokemon.weight).includes(term)
          || pipe.transform(pokemon.height).includes(term);
    });

  }

  returnTypePoke(term, pokemon){
    if (pokemon.type.filter(oneType => oneType.toLowerCase().includes(term)).length > 0) {
      return pokemon;
    }}

  filter = new FormControl('');

  clear(){
    this.pokemons = [];
    this.pokeStorage.clear();
  }

}
