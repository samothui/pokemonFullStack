import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { PokemonHomeComponent } from './pokemon-home/pokemon-home.component';


const routes: Routes = [
  {path: 'home', component: PokemonHomeComponent },
  {path: 'population', component: PokemonListComponent},
  {path: 'form', component: PokemonFormComponent},
  {path: '**', component: PokemonListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
