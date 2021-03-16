import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/_models/recipe.model';
import { RecipeService } from 'src/app/_services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  RecipeForm: FormGroup
  ingredients: FormArray;
  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((response) => {
      this.recipeService.updateRecipes(response.resolver)
    })

    this.activatedRoute.params.subscribe(params => {
      this.recipe = this.recipeService.getRecipe(params.id);

      this.RecipeForm = this.formBuilder.group({
        name: this.recipe.name,
        imagePath: this.recipe.imagePath,
        description: this.recipe.description,
        ingredients: this.formBuilder.array([])
      });

      if (this.recipe.ingredients !== undefined) {
        this.recipe.ingredients.forEach(element => {
          const ing = this.formBuilder.group({
            name: element.name,
            amount: element.amount,
          });
          this.ingredients = this.RecipeForm.get('ingredients') as FormArray;
          this.ingredients.push(ing);

        });
      }
    })
  }

  removeIngredientItem(index) {
    this.ingredients = this.RecipeForm.get('ingredients') as FormArray;
    this.ingredients.removeAt(index);
  }

  createIngredientItem(): FormGroup {
    return this.formBuilder.group({
      name: '',
      amount: '',
    });
  }

  addIngredientItem(): void {
    this.ingredients = this.RecipeForm.get('ingredients') as FormArray;
    this.ingredients.push(this.createIngredientItem());
  }

  onSubmit() {
    Object.assign(this.recipe, this.RecipeForm.getRawValue());
    this.recipeService.updateRecipe(this.recipe)

    this.router.navigate(['recipes', this.recipe.id])
    // this.RecipeForm.reset();
  }
}
