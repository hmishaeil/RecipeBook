import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/_models/recipe.model';
import { RecipeService } from 'src/app/_services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() eventFromRecipeList = new EventEmitter<Recipe>();

  editMode
  id

  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']){
        this.editMode = true;
        this.id = params['id']
      } else {
        this.editMode = false
      }
    })
    this.recipes = this.recipeService.getRecipes();
  }

  onCreateRecipe() { }

  rcvdEventFromRecipeItem($event) {
    this.eventFromRecipeList.emit($event);
  }
}
