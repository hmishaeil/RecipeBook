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

  RecipeForm: FormGroup;
  IngredientItems: FormArray = null;

  addBtnLabel = "Add Ingredients";

  constructor(private recipeService: RecipeService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.RecipeForm = this.formBuilder.group({
      recipeName: ['', Validators.required],
      recipeDesc: ['', Validators.required],
      IngredientItems: this.formBuilder.array([])
    });
  }

  createIngredientItem(): FormGroup {
    return this.formBuilder.group({
      ingName: ['', Validators.required],
      ingAmount: ['', [Validators.required, Validators.min(1)]],
    });
  }

  addIngredientItem(): void {
    this.IngredientItems = this.RecipeForm.get('IngredientItems') as FormArray;
    this.IngredientItems.push(this.createIngredientItem());

    this.addBtnLabel = "Add More Ingredients";

  }
  removeIngredientItem(index: number): void {
    this.IngredientItems = this.RecipeForm.get('IngredientItems') as FormArray;
    this.IngredientItems.removeAt(index);

    if (this.IngredientItems.length === 0) {
      this.addBtnLabel = "Add Ingredients";
    }
  }

  onSubmit() {

    const items = this.RecipeForm.get("IngredientItems").value;
    const ingredients = [];

    for (var key in items) {
      ingredients.push(new Ingredient(Number(key), items[key].ingName, items[key].ingAmount));
    }

    const recipeId = this.recipeService.getId();
    let recipe = new Recipe(recipeId,
      this.RecipeForm.get("recipeName").value,
      this.RecipeForm.get("recipeDesc").value,
      "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg", ingredients)

    this.recipeService.addRecipe(recipe);

    this.clearFormArray(this.RecipeForm.get("IngredientItems") as FormArray)
    this.RecipeForm.reset();
  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
}


