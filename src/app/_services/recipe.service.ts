import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../_models/ingredient.model';
import { Recipe } from '../_models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(1, 'Scala 1', 'Scala Recipe 1', 'https://www.acouplecooks.com/wp-content/uploads/2019/05/Chopped-Salad-008.jpg', 
    [
      new Ingredient(1, 'Tomato', 2),
      new Ingredient(2, 'Olives', 5),
      new Ingredient(3, 'Bell Pepper', 1),
    ]),
    new Recipe(2, 'Scala 2', 'Scala Recipe 2', 'https://www.eatwell101.com/wp-content/uploads/2018/02/Apple-Almond-Feta-Spinach-Salad-Recipe.jpg', [
      new Ingredient(1, 'Spinach', 1),
      new Ingredient(2, 'Cheese', 5),
      new Ingredient(3, 'Almond', 1),
    ]),
    new Recipe(3, 'Scala 3', 'Scala Recipe 3', 'https://www.wholesomeyum.com/wp-content/uploads/2020/03/wholesomeyum-chef-salad-recipe-4.jpg', [
      new Ingredient(1, 'Egg', 2),
      new Ingredient(2, 'Tomato', 4),
      new Ingredient(3, 'Cheese', 3),
    ])
  ];
  
  getRecipeEvent: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  
  constructor() { }

  getRecipes(){
    return this.recipes.slice(); // return a copy of recipes and not a reference
  }

  addIngToShoppingList(ing: Ingredient[]){

  }

  getRecipe(id: number): Recipe{
    return this.recipes.find(recipe => recipe.id === id);
  }

}
