import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Recipe } from '../_models/recipe.model';
import { DataStorageService } from './data-storage.service';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private _recipes: Recipe[] = [];
  get recipes() {
    return this._recipes
  }

  recipeToEdit$: Subject<Recipe> = new Subject<Recipe>();
  recipes$: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>(this.recipes);

  getRecipeEvent: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  constructor(private dataStorageService: DataStorageService) { }

  initFetchRecipes() {
    return this.dataStorageService.fetch().pipe(tap((recipes) => {
      this._recipes = recipes;
      this.recipes$.next(recipes)      
    }));
    
  }

  downloadRecipes() {
    this.dataStorageService.fetch().subscribe((recipes) => {
      this._recipes = recipes;
      this.recipes$.next(recipes)
    })
  }

  uploadRecipes() {
    this.dataStorageService.save(this.recipes).subscribe(data => console.log(data))
  }

  getRecipe(id): Recipe {
    return this.recipes.find(recipe => recipe.id === +id);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipes$.next(this.recipes);
  }

  getId() {
    return this.recipes.length + 1;
  }

  updateRecipes(recipes: Recipe[]) {
    this._recipes = recipes;
    this.recipes$.next(this.recipes)
  }

  updateRecipe(recipe) {
    let recipeIndex = this.recipes.findIndex(item => item.id === recipe.id)

    this.recipes[recipeIndex].name = recipe.name;
    this.recipes[recipeIndex].description = recipe.description;
    this.recipes[recipeIndex].ingredients = recipe.ingredients;

  }

  removeRecipe(recipe: Recipe) {

    let filtered = this.recipes.filter(el => el.id !== recipe.id);

    this._recipes = filtered;
    this.recipes$.next(filtered);
  }
}

