import { Component, OnInit } from '@angular/core';
import { Recipe } from '../_models/recipe.model';
import { RecipeService } from '../_services/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  constructor(private recipeService: RecipeService) { }

  rcvdRecipe = null

  ngOnInit() {
    this.recipeService.getRecipeEvent.subscribe(recipe =>{
      this.rcvdRecipe = recipe
    })
  }

}
