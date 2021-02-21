import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/_models/recipe.model';
import { RecipeService } from 'src/app/_services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  constructor(private recipeService: RecipeService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  // onRecipeClick(){
  //   // this.recipeService.getRecipeEvent.emit(this.recipe);
  //   this.router.navigate([this.recipe.id], {relativeTo: this.activatedRoute})
  // }
}
