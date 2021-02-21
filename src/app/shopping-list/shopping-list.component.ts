import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../_models/ingredient.model';
import { ShoppingListService } from '../_services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  items: Ingredient[] = [];
  mode: string = 'empty'; // add, edit
  itemToBeEdited

  private subscription: Subscription;
  
  constructor(private shoppingListService: ShoppingListService) { 
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.ingredients$.subscribe(x => {
      this.items = x;
    })
  }

  onEdit(item){
    console.log('item')
    this.shoppingListService.ingToBeEdited$.next(item);
    this.itemToBeEdited = item;
    this.mode = 'edit'
  }

  onRemove(item){
    this.shoppingListService.removeIngredient(item.id)
  }
}
