import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../_models/ingredient.model';
import { ShoppingListService } from '../_services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  items: Ingredient[] = [];
  mode: string = 'empty'; // add, edit
  itemToBeEdited

  constructor(private shoppingListService: ShoppingListService) { 
  }

  ngOnInit() {
    this.shoppingListService.ingredients.forEach(element => {
      this.items.push(element);
    });


    this.shoppingListService.ingredients$.subscribe(items => {
      this.items = items;
    })
  }

  onEdit(item){
    this.shoppingListService.ingToBeEdited$.next(item);
    this.itemToBeEdited = item;
    this.mode = 'edit'
  }

  onRemove(item){
    this.shoppingListService.removeIngredient(item.id)
  }
}
