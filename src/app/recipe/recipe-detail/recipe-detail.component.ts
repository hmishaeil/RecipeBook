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
    {'value': 'ToShoppingList', 'viewValue': 'To Shopping List'},
    {'value': 'Action_2', 'viewValue': 'Action 2'},
    {'value': 'Action_3', 'viewValue': 'Action 3'},
  ]
  
  incomingRecipe: Recipe = null;

  constructor(private slService: ShoppingListService, 
    private activatedRoute: ActivatedRoute,private resolveService: ResolveService) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.incomingRecipe = data.data
    })
  }

  addIngToShoppingList(){
    // this.slService.addIngredient(this.incomingRecipe.ingredients)
  }

}
