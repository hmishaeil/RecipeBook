import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../_models/recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class ResolveService implements Resolve<Recipe> {

  constructor(private recipeService: RecipeService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Recipe | Observable<Recipe> | Promise<Recipe> {
      return this.recipeService.getRecipe(+route.params.id);
  }
}
