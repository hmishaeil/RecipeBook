import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Ingredient } from 'src/app/_models/ingredient.model';
import { Recipe } from 'src/app/_models/recipe.model';
import { RecipeService } from 'src/app/_services/recipe.service';

@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.css']
})
export class RecipeAddComponent implements OnInit {

  showRecipeForm = true;
  showAddIngredientForm = false

  RecipeForm = new FormGroup({
    recipeName: new FormControl(null, Validators.required),
    recipeDesc: new FormControl(null, Validators.required),
    ingredients: new FormArray([])
  })

  IngredientForm = new FormGroup({
    ingName: new FormControl(null),
    ingAmount: new FormControl(null),
  })

  constructor(private recipeService: RecipeService, private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {

    const ings = [new Ingredient(1, "ingredient 1", 10)];
    const recipeId = this.recipeService.getId();

    let recipe = new Recipe(recipeId,
      this.RecipeForm.get("recipeName").value,
      this.RecipeForm.get("recipeDesc").value, "https://www.google.com", ings)
    this.recipeService.addRecipe(recipe)
    this.RecipeForm.reset();

    this.showRecipeForm = false;
    this.showAddIngredientForm = true;

  }

  onAddIngredients(){
    (<FormArray>this.RecipeForm.controls["ingredients"]).push(new FormControl(null))
  }

}


