import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/_models/recipe.model';
import { RecipeService } from 'src/app/_services/recipe.service';
import { ResolveService } from 'src/app/_services/resolve.service';
import { ShoppingListService } from 'src/app/_services/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  options = [
    { 'value': 'ToShoppingList', 'viewValue': 'To Shopping List' },
    { 'value': 'Action_2', 'viewValue': 'Action 2' },
    { 'value': 'Action_3', 'viewValue': 'Action 3' },
  ]

  incomingRecipe: Recipe = null;
  recipeId: string;

  constructor(private slService: ShoppingListService,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((response: any) => {
      console.log(response)
      this.recipeId = response.id
      this.incomingRecipe = this.recipeService.getRecipe(this.recipeId);

    })

    this.activatedRoute.data.subscribe((response: any) => {
      console.log(response)
      this.recipeService.updateRecipes(response.resolver)
      this.incomingRecipe = this.recipeService.getRecipe(this.recipeId);
    })

  }

  addIngToShoppingList() {
    this.slService.addIngredients(this.incomingRecipe.ingredients);
  }

  removeRecipeItem() {
    this.recipeService.removeRecipe(this.incomingRecipe);
    this.incomingRecipe = null;
  }
}
