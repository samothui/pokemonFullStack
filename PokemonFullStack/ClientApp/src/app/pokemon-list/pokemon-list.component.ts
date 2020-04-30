import { Component, OnInit, ViewChildren, QueryList, PipeTransform} from '@angular/core';
import { Pokemon, SortEvent, compare } from '../pokemon.interface';
import { PokemonsStorageService } from '../pokemons.service';
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
        let pokePokedex = {
          name:Response.name,
          type:[],
          order:Response.id,
          weight:pokemon.weight,
          height:pokemon.height,
          img: Response.sprites.front_default,
          stSpeed: Response.stats[0].base_stat,
          stSPDef: Response.stats[1].base_stat,
          stSPAtt: Response.stats[2].base_stat,
          stDef: Response.stats[3].base_stat,
          stAtt: Response.stats[4].base_stat,
          stHP: Response.stats[5].base_stat,
          ability: Response.abilities[0].ability.name,
          abilityDesc: ''
        }
        Response.types.map(values =>
          pokePokedex.type.push(this.titlecase.transform(values.type.name)));
        this.pokeStorage.callAbility(pokePokedex.ability)
        .subscribe(
          (Response:any) =>{
            pokePokedex.abilityDesc = Response.effect_entries[0].effect;
            this.pokeStorage.pokemonsPokedex=pokePokedex;
        console.log(this.pokeStorage.pokemonsPokedex);
        this.modalService.open(PokedexComponent, { size: 'lg' });
          }
        );

      }
    );

    // modalRef.componentInstance.name = 'World';
  }

  editPokemon(pokemon){
    this.pokeStorage.addToEditList(pokemon);
    this.router.navigate(['form']);
  }

  randomPoke(num){
    this.pokeStorage.addRandomPokemon(num);
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
